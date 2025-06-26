import type { Group } from '@/types/group';
import type { Timetable } from '@/types/schedule/timetable';
import type { ScheduleTeacher } from '@/types/schedule/index';
import type { Cabinet } from '@/types/schedule/cabinet';

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
