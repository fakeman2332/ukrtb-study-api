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
   * Получает информацию о пользователе
   * @return {Promise<UserDto>} - Информация о пользователе
   */
  async getCurrentUser(): Promise<UserDto> {
    return this.makeRequest<UserDto>('get', '');
  }

  /**
   * Получает список дисциплин для оценок
   * @return {Promise<DisciplineDto[]>} - Список дисциплин
   */
  async getScoreDisciplines(): Promise<DisciplineDto[]> {
    return this.scoresClient.makeRequest<DisciplineDto[]>('get', 'disciplines');
  }

  /**
   * Получает типы оценок
   * @return {Promise<ScoreTypeDto[]>} - Список типов оценок
   */
  async getScoreTypes(): Promise<ScoreTypeDto[]> {
    return this.scoresClient.makeRequest<ScoreTypeDto[]>('get', 'types');
  }

  /**
   * Получает семестры для оценок
   * @return {Promise<SemesterDto[]>} - Список семестров
   */
  async getScoreSemesters(): Promise<SemesterDto[]> {
    return this.scoresClient.makeRequest<SemesterDto[]>('get', 'semesters');
  }

  /**
   * Получает оценки по предмету
   * @param semester - Семестр
   * @param discipline - Дисциплина
   * @param type - Тип оценки
   * @param diplome - 0 - не идёт в диплом, 1 - идёт в диплом
   *
   */
  async getScores(semester: string, discipline: string, type: string, diplome: 0 | 1): Promise<SubjectScoresDto[]> {
    return this.scoresClient.makeRequest<SubjectScoresDto[]>('get', '', undefined, {
      semester,
      discipline,
      type,
      diplome
    }); 
  }

  /**
   * Получает дисциплины с пропусками
   * @return {Promise<DisciplineDto[]>} - Список дисциплин с пропусками
   */
  async getAttendanceDisciplines(): Promise<DisciplineDto[]> {
    return this.attendanceClient.makeRequest<DisciplineDto[]>('get', 'disciplines');
  }

  /**
   * Получает семестры с пропусками
   * @return {Promise<SemesterDto[]>} - Список семестров с пропусками
   */
  async getAttendanceSemesters(): Promise<SemesterDto[]> {
    return this.attendanceClient.makeRequest<SemesterDto[]>('get', 'semesters');
  }

  /**
   * Получает данные о посещаемости
   * @param discipline - Дисциплина
   * @param semester - Семестр
   * @return {Promise<AttendanceSubjectDto[]>} - Список посещаемости по предмету
   */
  async getAttendance(discipline: string, semester: string): Promise<AttendanceSubjectDto[]> {
    return this.attendanceClient.makeRequest<AttendanceSubjectDto[]>('get', '', undefined, {
      discipline,
      semester
    });
  }
}
