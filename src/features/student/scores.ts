import axios, { type AxiosInstance } from 'axios';
import { API_BASE } from '@/globals';
import type { ApiResponseDto } from '@/types/api-response-dto';
import type { ScoreTypeDto, SemesterDto, SubjectScoresDto } from '@/types/student/scoreDto';

class Scores {
  private readonly http: AxiosInstance;

  constructor(private readonly apiKey: string) {
    this.apiKey = apiKey;

    this.http = axios.create({
      baseURL: `${API_BASE}/scores`,
      headers: {
        Accept: 'application/json',
        apikey: this.apiKey
      }
    });
  }

  /**
   * Получает список дисциплин для студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<string[]>} Список дисциплин.
   * @throws {Error} Если не удалось получить дисциплины или произошла ошибка API.
   */
  async getDisciplines(authToken: string): Promise<string[]> {
    try {
      const response = await this.http.get<ApiResponseDto<string[]>>('disciplines', {
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
            throw new Error(`Доступ к дисциплинам запрещен`);
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
   * Получает типы оценок студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<string[]>} Список типов оценок.
   * @throws {Error} Если не удалось получить типы оценок или произошла ошибка API.
   */
  async getScoreTypes(authToken: string): Promise<ScoreTypeDto[]> {
    try {
      const response = await this.http.get<ApiResponseDto<ScoreTypeDto[]>>('types', {
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
            throw new Error(`Доступ к типам оценок запрещен`);
          }
          if (error.response.status === 404) {
            throw new Error(`Список типов оценок не найден`);
          }
          throw new Error(`Ошибка сервера (${error.response.status}): ${error.message}`);
        } else if (error.request) {
          throw new Error(`Не удалось подключиться к серверу при получении типов оценок`);
        }
      }
      throw error;
    }
  }

  /**
   * Получает список семестров студента.
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
   * Получает оценки студента по предмету.
   * @param {string} authToken - Токен авторизации студента.
   * @param {string} semester - Семестр.
   * @param {string} discipline - Название дисциплины.
   * @param {string} type - Тип оценки (например, "Ответ у доски", "Экзамен").
   * @param {0 | 1} diplome - Флаг "идёт в диплом" (0 - нет, 1 - да).
   * @returns {Promise<ApiResponseDto<SubjectScoresDto[]>>} Ответ с оценками по предмету.
   * @throws {Error} Если не удалось получить оценки или произошла ошибка API.
   */
  async getScores(
    authToken: string,
    semester: string,
    discipline: string,
    type: string,
    diplome: 0 | 1
  ): Promise<SubjectScoresDto[]> {
    try {
      const response = await this.http.get<ApiResponseDto<SubjectScoresDto[]>>('scores', {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        params: {
          semester,
          discipline,
          type,
          diplome
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
            throw new Error(`Доступ к оценкам запрещен`);
          }
          if (error.response.status === 404) {
            throw new Error(`Оценки не найдены`);
          }
          throw new Error(`Ошибка сервера (${error.response.status}): ${error.message}`);
        } else if (error.request) {
          throw new Error(`Не удалось подключиться к серверу при получении оценок`);
        }
      }
      throw error;
    }
  }
}

export default Scores;
