export type RawEntry = {
  title: string | undefined;
  link: string | undefined;
  description: string | undefined;
  date: string | undefined;
};

type CarParkBase = {
  id: string;
  name: string;
  address: string | undefined;
  updatedAt: number; // milliseconds since 1970, UTC
};

export type CarParkStatus =
  { status: 'open'; freeSpaces: number } | { status: 'closed' } | { status: 'unknown' };

export type CarPark = CarParkBase & CarParkStatus;

export type ProblemReason =
  'missing_title' | 'missing_link' | 'missing_id' | 'missing_date' | 'invalid_date';

export type Problem = {
  reason: ProblemReason;
  entry: RawEntry;
};

export type ParseResult = {
  carParks: CarPark[];
  problems: Problem[];
};
