import maxBy from 'lodash.maxby';
import { Precinct, Results, Regions } from './types';

const getRegionIds = async (regionLevel: string): Promise<string[]> => {
  if (regionLevel === 'neighborhood') {
    const {
      default: { features },
    } = await import(
      // @ts-ignore
      '../../data/consolidations.geojson'
    );
    return features.map(area => area.properties.CONSNAME);
  } else if (regionLevel === 'precinct') {
    const {
      default: { features },
    } = await import(
      // @ts-ignore
      '../../data/sandiego.txt'
    );
    return features.map(feature => feature.properties.PRECINCT);
  }
};

const getRegionBlueprint = (
  candidateIds: string[],
  regionIds: string[],
): Regions => {
  return regionIds.reduce(
    (acc, regionId) => ({
      ...acc,
      [regionId]: {
        candidates: candidateIds.reduce(
          (acc, candidateId) => ({
            ...acc,
            [candidateId]: null,
          }),
          {},
        ),
        sum: null,
        perYes: null,
        perNo: null,
        net: null,
        winMargin: null,
      },
    }),
    {},
  );
};

const precinctIdToRegionId = (precinctId: string, regionType: string) => {
  if (regionType === 'neighborhood') {
    return precinctId.replace(/\d+-\d+-/, '').replace(/-VBM/g, '');
  } else if (regionType === 'precinct') {
    // ex: "0001-105000-RANCHO BERNARDO"
    return precinctId.match(/\d{4}-(\d{6})/)[1];
  }
};

export const getContestData = async (
  contestName: string,
  regionType: 'neighborhood' | 'precinct' = 'neighborhood',
): Promise<Results> => {
  if (!contestName) {
    return;
  }

  // @ts-ignore
  const { default: summary } = await import('../../data/summary_8.json');
  const { default: precincts }: { default: Precinct[] } = await import(
    // @ts-ignore
    '../../data/precincts_8.json'
  );
  const contests = summary.filter(item => item['Contest Name'] === contestName);
  const candidates = contests.map(item => item['Candidate Name']);
  const affirmativeCandidateName = candidates.find(
    candidate => candidate.indexOf('YES') > -1,
  );
  const negativeCandidateName = candidates.find(
    candidate => candidate.indexOf('NO') > -1,
  );
  const isBinaryRace =
    candidates.length === 2 &&
    affirmativeCandidateName &&
    negativeCandidateName;
  const regions = await getRegionIds(regionType);

  return {
    contestName,
    isBinaryRace,
    candidates,
    regions: (() => {
      const blueprint = getRegionBlueprint(candidates, regions);

      // Decorate blueprint with raw stats.
      precincts
        .filter(p => p['Contest Name'] === contestName)
        .forEach(p => {
          const regionId = precinctIdToRegionId(p.Precinct, regionType);
          const candidateId = p['Candidate Name'];
          const voteCount = Number(p.Votes);
          /* Some precinct data (e.g, precinct "8294-999294-VBM-AV")
           * doesn't correlate to any mappable area. */
          blueprint[regionId] &&
            (blueprint[regionId].candidates[candidateId] += voteCount);
        });

      // Decorate blueprint with computed metrics.
      regions.forEach(regionId => {
        const region = blueprint[regionId];
        const nameCountTuple = Object.entries(region.candidates)
          .sort(([, a], [, b]) => {
            return b - a;
          })
          .filter(([, a]) => a > 0);

        const winners = nameCountTuple.filter(
          winner => winner[1] === nameCountTuple[0][1],
        );
        const tie = winners.length > 1;

        blueprint[regionId] = {
          ...region,
          tie,
          sum: Object.values(region.candidates).reduce((a, b) => a + b),
          get winners() {
            return winners;
          },
          get winner() {
            const noVotes = this.sum === 0;
            if (noVotes || tie) {
              return null;
            }
            return nameCountTuple[0][0];
          },
          get winMargin() {
            if (this.sum === 0) {
              return null;
            }
            if (nameCountTuple.length <= 1) {
              return nameCountTuple.length;
            }
            return (nameCountTuple[0][1] - nameCountTuple[1][1]) / this.sum;
          },
          get perYes() {
            return region.candidates[affirmativeCandidateName] / this.sum || 0;
          },
          get perNo() {
            return region.candidates[negativeCandidateName] / this.sum || 0;
          },
          get net() {
            return this.perYes - this.perNo;
          },
        };
      });

      return blueprint;
    })(),
  };
};
