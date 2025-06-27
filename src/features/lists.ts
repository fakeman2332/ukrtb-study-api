import axios, { AxiosInstance, type AxiosResponse } from 'axios';
import { API_BASE } from '@/globals';
import type { GroupDto } from '@/types/groupDto';
import type { ApiResponseDto } from '@/types/api-response-dto';
import type { TeacherDto } from '@/types/teacherDto';
import type { CabinetDto } from '@/types/schedule/cabinetDto';

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
   * @returns {Promise<GroupDto[]>} Список групп.
   * @throws {Error} Если не удалось получить список групп или произошла ошибка API.
   */
  async getGroups(): Promise<GroupDto[]> {
    const response: AxiosResponse<ApiResponseDto<GroupDto[]>> = await this.http.get('groups');

    if (response.status === 204) {
      return [];
    }

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
   * @returns {Promise<TeacherDto[]>} Список преподавателей.
   * @throws {Error} Если не удалось получить список преподавателей или произошла ошибка API.
   */
  async getTeachers(): Promise<TeacherDto[]> {
    const response = await this.http.get<ApiResponseDto<TeacherDto[]>>('teachers');

    if (response.status === 204) {
      return [];
    }

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
   * @returns {Promise<CabinetDto[]>} Список кабинетов.
   * @throws {Error} Если не удалось получить список кабинетов или произошла ошибка API.
   */
  async getCabs(): Promise<CabinetDto[]> {
    const response: AxiosResponse<ApiResponseDto<CabinetDto[]>> = await this.http.get('cabs');

    if (response.status === 204) {
      return [];
    }

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
