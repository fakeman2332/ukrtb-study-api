import type { AuthResponseDto, UserDto } from '@/types/auth-response-dto';
import type { DisciplineDto, SemesterDto, SubjectScoresDto, ScoreTypeDto } from '@/types/student/scoreDto';
import type { AttendanceSubjectDto } from '@/types/student/attendanceDto';
import { API_BASE } from '@/globals';
import { BaseApiClient } from '../api-client';

export class AuthenticatedStudent extends BaseApiClient {
  public readonly token: string;
  public readonly user: UserDto;
  private readonly scoresClient: BaseApiClient;
  private readonly attendanceClient: BaseApiClient;

  constructor(apiKey: string, authData: AuthResponseDto) {
    super(`${API_BASE}/user`, apiKey, authData.token);
    this.token = authData.token;
    this.user = authData.user;

    this.scoresClient = new BaseApiClient(`${API_BASE}/scores`, apiKey, authData.token);
    this.attendanceClient = new BaseApiClient(`${API_BASE}/attendances`, apiKey, authData.token);
  }

  /**
   * Получает обновленную информацию о пользователе
   */
  async getCurrentUser(): Promise<UserDto> {
    return this.makeRequest<UserDto>('get', '');
  }

  /**
   * Получает список дисциплин для оценок
   */
  async getScoreDisciplines(): Promise<DisciplineDto[]> {
    return this.scoresClient.makeRequest<DisciplineDto[]>('get', 'disciplines');
  }

  /**
   * Получает типы оценок
   */
  async getScoreTypes(): Promise<ScoreTypeDto[]> {
    return this.scoresClient.makeRequest<ScoreTypeDto[]>('get', 'types');
  }

  /**
   * Получает семестры для оценок
   */
  async getScoreSemesters(): Promise<SemesterDto[]> {
    return this.scoresClient.makeRequest<SemesterDto[]>('get', 'semesters');
  }

  /**
   * Получает оценки по предмету
   */
  async getScores(semester: string, discipline: string, type: string, diplome: 0 | 1): Promise<SubjectScoresDto[]> {
    return this.scoresClient.makeRequest<SubjectScoresDto[]>('get', 'scores', undefined, {
      semester,
      discipline,
      type,
      diplome
    });
  }

  /**
   * Получает дисциплины с пропусками
   */
  async getAttendanceDisciplines(): Promise<DisciplineDto[]> {
    return this.attendanceClient.makeRequest<DisciplineDto[]>('get', 'disciplines');
  }

  /**
   * Получает семестры с пропусками
   */
  async getAttendanceSemesters(): Promise<SemesterDto[]> {
    return this.attendanceClient.makeRequest<SemesterDto[]>('get', 'semesters');
  }

  /**
   * Получает данные о посещаемости
   */
  async getAttendance(discipline: string, semester: string): Promise<AttendanceSubjectDto[]> {
    return this.attendanceClient.makeRequest<AttendanceSubjectDto[]>('get', '', undefined, {
      discipline,
      semester
    });
  }
}
