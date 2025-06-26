import axios, { AxiosInstance, type AxiosResponse } from 'axios';
import { API_BASE } from '@/globals';
import type { Group } from '@/types/group';
import type { ApiResponse } from '@/types/api-response';
import type { Teacher } from '@/types/teacher';
import type { Cabinet } from '@/types/schedule/cabinet';

class Lists {
  private http: AxiosInstance;

  constructor(private readonly apiKey: string) {
    this.apiKey = apiKey;

    this.http = axios.create({
      baseURL: `${API_BASE}/schedules`,
      headers: {
        Accept: 'application/json',
        apikey: this.apiKey
      }
    });
  }

  /**
   * Получает список групп.
   * @returns {Promise<Group[]>} Список групп.
   * @throws {Error} Если не удалось получить список групп или произошла ошибка API.
   */
  async getGroups(): Promise<Group[]> {
    const response: AxiosResponse<ApiResponse<Group[]>> = await this.http.get('groups');

    if (response.status !== 200) {
      throw new Error(`Не удалось получить список групп:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает список преподавателей.
   * @returns {Promise<Teacher[]>} Список преподавателей.
   * @throws {Error} Если не удалось получить список преподавателей или произошла ошибка API.
   */
  async getTeachers(): Promise<Teacher[]> {
    const response = await this.http.get<ApiResponse<Teacher[]>>('teachers');

    if (response.status !== 200) {
      throw new Error(`Не удалось получить список преподавателей:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает список кабинетов.
   * @returns {Promise<Cabinet[]>} Список кабинетов.
   * @throws {Error} Если не удалось получить список кабинетов или произошла ошибка API.
   */
  async getCabs(): Promise<Cabinet[]> {
    const response: AxiosResponse<ApiResponse<Cabinet[]>> = await this.http.get('cabs');

    if (response.status !== 200) {
      throw new Error(`Не удалось получить список кабинетов:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }
}

export default Lists;
