const getNeighborhoods = async (): Promise<string[]> => {
  const {
    default: { features },
  } = await import(
    // @ts-ignore
    '../../data/consolidations.geojson'
  );
  return features.map(area => area.properties.CONSNAME);
};

export interface Results {
  contestName: string;
  isBinaryRace: boolean;
  candidates: string[];
  results: {
    // Candidate names & vote count
    [key: string]: number;
    // Below: for binary races only.
    sum?: number;
    readonly perYes?: number;
    readonly perNo?: number;
    readonly net?: number;
  };
}

export const getContestData = async (contestName: string): Promise<Results> => {
  if (!contestName) {
    return;
  }

  // @ts-ignore
  const { default: summary } = await import('../../data/summary_8.json');
  // @ts-ignore
  const { default: precincts } = await import('../../data/precincts_8.json');

  const contests = summary.filter(item => item['Contest Name'] === contestName);
  const candidates = contests.map(item => item['Candidate Name']);
  const isBinaryRace = candidates.length === 2;
  const neighborhoods = await getNeighborhoods();

  const results = neighborhoods.reduce((acc, currVal) => {
    acc[currVal] = {};
    candidates.forEach(candidate => {
      acc[currVal][candidate] = 0;
    });
    return acc;
  }, {});

  precincts.forEach(precinct => {
    if (precinct['Contest Name'] !== contestName) {
      return;
    }
    const neighborhood = precinct.Precinct.replace(/\d+-\d+-/, '').replace(
      /-VBM/g,
      '',
    );
    const candidate = precinct['Candidate Name'];
    if (typeof results?.[neighborhood]?.[candidate] === 'number') {
      results[neighborhood][candidate] += Number(precinct.Votes);
    }
  });

  // Decorate with percentages for coloring purposes.
  if (isBinaryRace) {
    Object.keys(results).forEach(neighborhood => {
      const { YES, NO } = results[neighborhood];

      const moreData = {
        sum: YES + NO,
        get perYes() {
          return YES / this.sum || 0;
        },
        get perNo() {
          return NO / this.sum || 0;
        },
        get net() {
          return this.perYes - this.perNo;
        },
      };

      results[neighborhood] = {
        ...results[neighborhood],
        ...moreData,
      };
    });
  }

  return {
    contestName,
    isBinaryRace,
    candidates,
    results,
  };
};
