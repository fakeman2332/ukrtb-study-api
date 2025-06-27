import type { GroupDto } from '@/types/groupDto';
import type { TimetableDto } from '@/types/schedule/timetableDto';
import type { ScheduleTeacherDto } from '@/types/schedule/index';
import type { CabinetDto } from '@/types/schedule/cabinetDto';

export type LessonDto = {
  number: number;
  type: string;
  discipline: string;
  timetable: TimetableDto;
  do: boolean;
  group: GroupDto;
  teacher: ScheduleTeacherDto;
  cab: CabinetDto;
};
