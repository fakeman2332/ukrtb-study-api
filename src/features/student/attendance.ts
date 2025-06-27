import { API_BASE } from '@/globals';
import { type AxiosInstance } from 'axios';
import type { DisciplineDto, SemesterDto } from '@/types/student/scoreDto';
import type { ApiResponseDto } from '@/types/api-response-dto';
import type { AttendanceSubjectDto } from '@/types/student/attendanceDto';

class Attendance {
  private readonly http: AxiosInstance;

  constructor(
    private readonly apiKey: string,
    http: AxiosInstance
  ) {
    this.apiKey = apiKey;

    this.http = http.create({
      baseURL: `${API_BASE}/attendances`
    });
  }

  /**
   * Получает список дисциплин с пропусками студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<DisciplineDto[]>} Список дисциплин.
   * @throws {Error} Если не удалось получить дисциплины или произошла ошибка API.
   */
  async getDisciplines(): Promise<DisciplineDto[]> {
    const response = await this.http.get<ApiResponseDto<DisciplineDto[]>>('disciplines');

    if (response.status === 204) {
      return [];
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить дисциплины:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает список семестров с пропусками у студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<SemesterDto[]>} Список семестров.
   * @throws {Error} Если не удалось получить семестры или произошла ошибка API.
   */
  async getSemesters(authToken: string): Promise<SemesterDto[]> {
    const response = await this.http.get<ApiResponseDto<SemesterDto[]>>('semesters', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (response.status === 204) {
      return [];
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить семестры:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает пропуски по дисциплине и семестру.
   * @param {string} authToken - Токен авторизации студента.
   * @param {string} discipline - Название дисциплины.
   * @param {string} semester - Название семестра.
   * @returns {Promise<AttendanceSubjectDto[]>} Список пропусков по предмету.
   * @throws {Error} Если не удалось получить пропуски или произошла ошибка API.
   */
  async getAttendance(authToken: string, discipline: string, semester: string): Promise<AttendanceSubjectDto[]> {
    const response = await this.http.get<ApiResponseDto<AttendanceSubjectDto[]>>('', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params: {
        discipline,
        semester
      }
    });

    if (response.status === 204) {
      return [];
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить посещаемость:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }
}

export default Attendance;
