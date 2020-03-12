interface CandidatesVoteCount {
  [candidateId: string]: number;
}

export interface Region {
  // Candidate name (key) & vote count
  candidates: CandidatesVoteCount;
  sum: number;
  winner?: string;
  // Below: for binary races only.
  perYes?: number;
  perNo?: number;
  net?: number;
}

export interface Regions {
  [regionId: string]: Region;
}

export interface Results {
  contestName: string;
  isBinaryRace: boolean;
  candidates: string[];
  // A region is one (or more) precincts
  regions: Regions;
}

export interface Precinct {
  Precinct: string;
  'Contest Name': string;
  'Candidate Name': string;
  Votes: string;
  'Voter Turnout': string;
}
