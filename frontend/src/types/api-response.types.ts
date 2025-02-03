export type IPAPIResponse = {
  success: boolean;
  meta: Meta;
  data: Data;
};

export type IPAPIResponseAll = {
  success: boolean;
  data: Data;
};

export type IPAPIResponseLastUpdated = {
  success: boolean;
  data: {
    lastUpdated: Date;
  };
};

export type Meta = {
  limit: number;
  page: number;
  pageSize: number;
};

export type Data = {
  seminars: Seminar[];
};

export type Seminar = {
  title: string;
  seminarType: SeminarType;
  studentName: string;
  major: Major;
  room: Room;
  datetime: Date;
  advisors: string[];
  examiners: string[];
};

export enum Major {
  SI = "SI",
  TI = "TI",
  BD = "BD",
}

export enum Room {
  Ruangan1 = "Ruangan 1",
  Ruangan10 = "Ruangan 10",
  Ruangan11 = "Ruangan 11",
  Ruangan12 = "Ruangan 12",
  Ruangan13 = "Ruangan 13",
  Ruangan14 = "Ruangan 14",
  Ruangan2 = "Ruangan 2",
  Ruangan35 = "Ruangan 3/5",
  Ruangan46 = "Ruangan 4/6",
  Ruangan7 = "Ruangan 7",
  Ruangan8 = "Ruangan 8",
  Ruangan9 = "Ruangan 9",
}

export enum SeminarType {
  Pendadaran = "Pendadaran",
  Seminar1 = "Seminar 1",
  Seminar2 = "Seminar 2",
  SeminarKKP = "Seminar KKP",
  SeminarPI = "Seminar PI",
}
