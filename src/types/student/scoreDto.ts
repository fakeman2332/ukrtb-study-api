import type { TeacherDto } from '@/types/teacherDto';

export interface SubjectScoresDto {
  title: string;
  scores: ScoreDto[];
}

export interface ScoreDto {
  date: string;
  score: number;
  diplome: boolean;
  semester: SemesterDto;
  discipline: DisciplineDto;
  teacher: TeacherDto;
  type: ScoreTypeDto;
}

export interface SemesterDto {
  title: string;
}

export interface DisciplineDto {
  title: string;
}

export interface ScoreTypeDto {
  title: string;
}
