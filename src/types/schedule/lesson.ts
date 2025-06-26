import type { Cabinet } from '@types/schedule/cabinet';
import type { ScheduleTeacher } from '@types/schedule/index';
import type { Timetable } from '@types/schedule/timetable';

export type Lesson = {
  number: number;
  type: string;
  discipline: string;
  timetable: Timetable;
  do: boolean;
  group: Group;
  teacher: ScheduleTeacher;
  cab: Cabinet;
};
