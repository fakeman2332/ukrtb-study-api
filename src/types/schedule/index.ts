import type { LessonDto } from '@/types/schedule/lessonDto';
import type { TeacherDto } from '@/types/teacherDto';

export type ScheduleDto = {
  type: 'groups' | 'teachers' | 'cabs';
  date: string;
  title: string;
  schedules: LessonDto[];
};

export type ScheduleTeacherDto = TeacherDto & {
  link: string;
};
