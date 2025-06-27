import { API_BASE } from '@/globals';
import axios, { type AxiosInstance } from 'axios';
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
   * @returns {Promise<DisciplineDto[]>} Список дисциплин.
   * @throws {Error} Если не удалось получить дисциплины или произошла ошибка API.
   */
  async getDisciplines(): Promise<DisciplineDto[]> {
    try {
      const response = await this.http.get<ApiResponseDto<DisciplineDto[]>>('disciplines');

      if (response.status === 204 || !response.data) {
        return [];
      }

      if (!response.data.success) {
        throw new Error(`Ошибка API: ${response.data.message || 'Неизвестная ошибка'}`);
      }

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData?.message) {
            throw new Error(`Ошибка сервера: ${errorData.message}`);
          }
          if (error.response.status === 404) {
            throw new Error(`Список дисциплин не найден`);
          }
          throw new Error(`Ошибка сервера (${error.response.status}): ${error.message}`);
        } else if (error.request) {
          throw new Error(`Не удалось подключиться к серверу при получении дисциплин`);
        }
      }
      throw error;
    }
  }

  /**
   * Получает список семестров с пропусками у студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<SemesterDto[]>} Список семестров.
   * @throws {Error} Если не удалось получить семестры или произошла ошибка API.
   */
  async getSemesters(authToken: string): Promise<SemesterDto[]> {
    try {
      const response = await this.http.get<ApiResponseDto<SemesterDto[]>>('semesters', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      if (response.status === 204 || !response.data) {
        return [];
      }

      if (!response.data.success) {
        throw new Error(`Ошибка API: ${response.data.message || 'Неизвестная ошибка'}`);
      }

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData?.message) {
            throw new Error(`Ошибка сервера: ${errorData.message}`);
          }
          if (error.response.status === 401) {
            throw new Error(`Неверный или истекший токен авторизации`);
          }
          if (error.response.status === 403) {
            throw new Error(`Доступ к семестрам запрещен`);
          }
          if (error.response.status === 404) {
            throw new Error(`Список семестров не найден`);
          }
          throw new Error(`Ошибка сервера (${error.response.status}): ${error.message}`);
        } else if (error.request) {
          throw new Error(`Не удалось подключиться к серверу при получении семестров`);
        }
      }
      throw error;
    }
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
    try {
      const response = await this.http.get<ApiResponseDto<AttendanceSubjectDto[]>>('', {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        params: {
          discipline,
          semester
        }
      });

      if (response.status === 204 || !response.data) {
        return [];
      }

      if (!response.data.success) {
        throw new Error(`Ошибка API: ${response.data.message || 'Неизвестная ошибка'}`);
      }

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData?.message) {
            throw new Error(`Ошибка сервера: ${errorData.message}`);
          }
          if (error.response.status === 401) {
            throw new Error(`Неверный или истекший токен авторизации`);
          }
          if (error.response.status === 403) {
            throw new Error(`Доступ к посещаемости запрещен`);
          }
          if (error.response.status === 404) {
            throw new Error(`Данные о посещаемости не найдены`);
          }
          throw new Error(`Ошибка сервера (${error.response.status}): ${error.message}`);
        } else if (error.request) {
          throw new Error(`Не удалось подключиться к серверу при получении посещаемости`);
        }
      }
      throw error;
    }
  }
}

export default Attendance;
