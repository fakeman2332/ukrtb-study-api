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
    const response = await this.http.get<ApiResponseDto<string[]>>('disciplines', {
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
   * Получает типы оценок студента.
   * @param {string} authToken - Токен авторизации студента.
   * @returns {Promise<string[]>} Список типов оценок.
   * @throws {Error} Если не удалось получить типы оценок или произошла ошибка API.
   */
  async getScoreTypes(authToken: string): Promise<ScoreTypeDto[]> {
    const response = await this.http.get<ApiResponseDto<ScoreTypeDto[]>>('types', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (response.status === 204) {
      return [];
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить типы оценок:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает список семестров студента.
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
   * Получает оценки студента по предмету.
   * @param {string} authToken - Токен авторизации студента.
   * @param {string} semester - Семестр (например, "1", "2").
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

    if (response.status === 204) {
      return [];
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить оценки:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }
}

export default Scores;
