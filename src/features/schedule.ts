import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { API_BASE } from '@/globals';
import type { ApiResponse } from '@/types/api-response';
import type { Schedule as ScheduleDto } from '@/types/schedule';

class Schedule {
  private readonly http: AxiosInstance;

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
   * Получает расписание группы на указанную дату.
   * @param {string} group - Название группы.
   * @param {string} date - Дата в формате YYYY-MM-DD.
   * @returns {Promise<ScheduleDto | null>} Расписание группы или null, если расписание отсутствует.
   * @throws {Error} Если не удалось получить расписание или произошла ошибка API.
   */
  async getGroupSchedule(group: string, date: string): Promise<ScheduleDto | null> {
    const response: AxiosResponse<ApiResponse<ScheduleDto>> = await this.http.get('', {
      params: {
        date,
        group
      }
    });

    if (response.status === 204) {
      return null;
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить расписание группы ${group} на дату ${date}:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает расписание преподавателя на указанную дату.
   * @param {string} teacher - ФИО преподавателя.
   * @param {string} date - Дата в формате YYYY-MM-DD.
   * @returns {Promise<ScheduleDto | null>} Расписание преподавателя или null, если расписание отсутствует.
   * @throws {Error} Если не удалось получить расписание или произошла ошибка API.
   */
  async getTeacherSchedule(teacher: string, date: string): Promise<ScheduleDto | null> {
    const response: AxiosResponse<ApiResponse<ScheduleDto>> = await this.http.get('', {
      params: {
        date,
        teacher
      }
    });

    if (response.status === 204) {
      return null;
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить расписание преподавателя ${teacher} на дату ${date}:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает расписание кабинета на указанную дату.
   * @param {string} cab - Номер кабинета.
   * @param {string} date - Дата в формате YYYY-MM-DD.
   * @return {Promise<ScheduleDto | null>} Расписание кабинета или null, если расписание отсутствует.
   * @throws {Error} Если не удалось получить расписание или произошла ошибка API.
   */
  async getCabinetSchedule(cab: string, date: string): Promise<ScheduleDto | null> {
    const response: AxiosResponse<ApiResponse<ScheduleDto>> = await this.http.get('', {
      params: {
        date,
        cab
      }
    });

    if (response.status === 204) {
      return null;
    }

    if (response.status !== 200) {
      throw new Error(`Не удалось получить расписание кабинета ${cab} на дату ${date}:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }
}

export default Schedule;
