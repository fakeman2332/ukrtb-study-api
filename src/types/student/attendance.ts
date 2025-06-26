import type { Semester } from '@/types/student/score';
import type { Teacher } from '@/types/teacher';

export interface AttendanceSubject {
  title: string;
  attendances: Attendance[];
}

export interface Attendance {
  date: string;
  number: number;
  semester: Semester;
  teacher: Teacher;
}
