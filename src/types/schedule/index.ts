import type { Lesson } from '@/types/schedule/lesson';
import type { Teacher } from '@/types/teacher';

export type Schedule = {
  type: 'groups' | 'teachers' | 'cabs';
  date: string;
  title: string;
  schedules: Lesson[];
};

export type ScheduleTeacher = Teacher & {
  link: string;
};
