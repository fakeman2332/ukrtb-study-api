import { API_BASE } from '@/globals';
import axios, { type AxiosInstance } from 'axios';
import type { Discipline, Semester } from '@/types/student/score';
import type { ApiResponse } from '@/types/api-response';
import type { AttendanceSubject } from '@/types/student/attendance';

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

    console.log(this.http.defaults);
  }

  /**
   * Получает список дисциплин с пропусками студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<Discipline[]>} Список дисциплин.
   * @throws {Error} Если не удалось получить дисциплины или произошла ошибка API.
   */
  async getDisciplines(authToken: string): Promise<Discipline[]> {
    const response = await this.http.get<ApiResponse<Discipline[]>>('disciplines', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

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
   * @returns {Promise<Semester[]>} Список семестров.
   * @throws {Error} Если не удалось получить семестры или произошла ошибка API.
   */
  async getSemesters(authToken: string): Promise<Semester[]> {
    const response = await this.http.get<ApiResponse<Semester[]>>('semesters', {
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
   * @returns {Promise<AttendanceSubject[]>} Список пропусков по предмету.
   * @throws {Error} Если не удалось получить пропуски или произошла ошибка API.
   */
  async getAttendance(authToken: string, discipline: string, semester: string): Promise<AttendanceSubject[]> {
    const response = await this.http.get<ApiResponse<AttendanceSubject[]>>('', {
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
