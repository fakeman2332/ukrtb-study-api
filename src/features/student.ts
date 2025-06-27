import type { AuthResponseDto, UserDto } from '@/types/auth-response-dto';
import { API_BASE } from '@/globals';
import { BaseApiClient } from './api-client';
import { AuthenticatedStudent } from '@/features/student/authenticated-student';

class Student extends BaseApiClient {
  constructor(apiKey: string) {
    super(`${API_BASE}/user`, apiKey);
  }

  /**
   * Авторизует студента и возвращает экземпляр AuthenticatedStudent
   * @param login - Логин студента
   * @param password - Пароль студента
   * @returns {AuthenticatedStudent} - Экземпляр авторизованного студента
   */
  async login(login: string, password: string): Promise<AuthenticatedStudent> {
    const authData = await this.makeRequest<AuthResponseDto>('post', 'login', {
      login,
      password
    });

    return new AuthenticatedStudent(this.http.defaults.headers.apikey as string, authData);
  }

  /**
   * Получает информацию о текущем пользователе (требует авторизации)
   * @returns Информация о пользователе
   */
  async getCurrentUser(): Promise<UserDto> {
    return this.makeRequest<UserDto>('get', '');
  }
}

export default Student;
