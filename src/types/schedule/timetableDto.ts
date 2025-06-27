export type TimetableDto = {
  start: string;
  end: string;
};

export type FullTimetableDto = TimetableDto & {
  number: number;
  break: number;
};

export type TimetableResponseDto = {
  title: string;
  timetables: FullTimetableDto[];
};
