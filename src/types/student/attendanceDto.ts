import type { SemesterDto } from '@/types/student/scoreDto';
import type { TeacherDto } from '@/types/teacherDto';

export interface AttendanceSubjectDto {
  title: string;
  attendances: AttendanceDto[];
}

export interface AttendanceDto {
  date: string;
  number: number;
  semester: SemesterDto;
  teacher: TeacherDto;
}
