import { API_BASE } from '@/globals';
import type { ScheduleDto } from '@/types/schedule';
import { BaseApiClient } from '@/features/api-client';

class Schedule extends BaseApiClient {
  constructor(apiKey: string) {
    super(`${API_BASE}/schedules`, apiKey);
  }

  /**
   * Получает расписание группы на указанную дату.
   * @param group - Название группы
   * @param date - Дата в формате YYYY-MM-DD
   * @returns Расписание группы или null, если расписание отсутствует
   */
  async getGroupSchedule(group: string, date: string): Promise<ScheduleDto | null> {
    const result = await this.makeRequest<ScheduleDto>('get', '', undefined, {
      date,
      group
    });

    return Array.isArray(result) && result.length === 0 ? null : result;
  }

  /**
   * Получает расписание преподавателя на указанную дату.
   * @param teacher - ФИО преподавателя
   * @param date - Дата в формате YYYY-MM-DD
   * @returns Расписание преподавателя или null, если расписание отсутствует
   */
  async getTeacherSchedule(teacher: string, date: string): Promise<ScheduleDto | null> {
    const result = await this.makeRequest<ScheduleDto>('get', '', undefined, {
      date,
      teacher
    });

    return Array.isArray(result) && result.length === 0 ? null : result;
  }

  /**
   * Получает расписание кабинета на указанную дату.
   * @param cab - Номер кабинета
   * @param date - Дата в формате YYYY-MM-DD
   * @returns Расписание кабинета или null, если расписание отсутствует
   */
  async getCabinetSchedule(cab: string, date: string): Promise<ScheduleDto | null> {
    const result = await this.makeRequest<ScheduleDto>('get', '', undefined, {
      date,
      cab
    });

    return Array.isArray(result) && result.length === 0 ? null : result;
  }
}

export default Schedule;
