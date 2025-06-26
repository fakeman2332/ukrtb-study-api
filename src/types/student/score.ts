import type { Teacher } from '@/types/teacher';

export interface SubjectScores {
  title: string;
  scores: Score[];
}

export interface Score {
  date: string;
  score: number;
  diplome: boolean;
  semester: Semester;
  discipline: Discipline;
  teacher: Teacher;
  type: ScoreType;
}

export interface Semester {
  title: string;
}

export interface Discipline {
  title: string;
}

export interface ScoreType {
  title: string;
}
