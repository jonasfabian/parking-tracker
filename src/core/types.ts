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

type CarParkStatus =
  { status: 'open'; freeSpaces: number } | { status: 'closed' } | { status: 'unknown' };

export type CarPark = CarParkBase & CarParkStatus;
