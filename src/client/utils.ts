import maxBy from 'lodash.maxby';
import { Precinct, Results, Regions } from './types';

const getNeighborhoods = async (): Promise<string[]> => {
  const {
    default: { features },
  } = await import(
    // @ts-ignore
    '../../data/consolidations.geojson'
  );
  return features.map(area => area.properties.CONSNAME);
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
      },
    }),
    {},
  );
};

const precinctIdToNeighborhood = (precinctId: string) => {
  return precinctId.replace(/\d+-\d+-/, '').replace(/-VBM/g, '');
};

export const getContestData = async (
  contestName: string,
  level = 'neighborhood',
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
  const regions = level === 'neighborhood' && (await getNeighborhoods());

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
          const regionId = precinctIdToNeighborhood(p.Precinct);
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
        blueprint[regionId] = {
          ...region,
          sum: Object.values(region.candidates).reduce((a, b) => a + b),
          get winner() {
            if (this.sum === 0) {
              return null;
            }
            return maxBy(
              Object.keys(region.candidates),
              cId => region.candidates[cId],
            );
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
