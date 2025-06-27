import { API_BASE } from '@/globals';
import type { GroupDto } from '@/types/groupDto';
import type { TeacherDto } from '@/types/teacherDto';
import type { CabinetDto } from '@/types/schedule/cabinetDto';
import { BaseApiClient } from '@/features/api-client';
import type { TimetableResponseDto } from '@/types/schedule/timetableDto';

class Lists extends BaseApiClient {
  constructor(apiKey: string) {
    super(`${API_BASE}/schedules`, apiKey);
  }

  /**
   * Получает список групп.
   * @returns Список групп
   */
  async getGroups(): Promise<GroupDto[]> {
    return this.makeRequest<GroupDto[]>('get', 'groups');
  }

  /**
   * Получает список преподавателей.
   * @returns Список преподавателей
   */
  async getTeachers(): Promise<TeacherDto[]> {
    return this.makeRequest<TeacherDto[]>('get', 'teachers');
  }

  /**
   * Получает список кабинетов.
   * @returns Список кабинетов
   */
  async getCabs(): Promise<CabinetDto[]> {
    return this.makeRequest<CabinetDto[]>('get', 'cabs');
  }

  /**
   * Получает расписание звонков
   * @returns Расписание звонков
   */
  async getTimetables(): Promise<TimetableResponseDto> {
    return this.makeRequest<TimetableResponseDto>('get', 'timetables');
  }
}

export default Lists;
