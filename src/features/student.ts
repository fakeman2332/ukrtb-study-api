import type { AuthResponseDto, UserDto } from '@/types/auth-response-dto';
import { API_BASE } from '@/globals';
import axios, { type AxiosInstance } from 'axios';
import type { ApiResponseDto } from '@/types/api-response-dto';
import Attendance from '@/features/student/attendance';
import TokenStorage from '@/features/tokenStorage';

class Student {
  private readonly http: AxiosInstance;

  public readonly attendance: Attendance;
  // public readonly scores: Scores;

  public readonly tokenStorage: TokenStorage;

  constructor(private readonly apiKey: string) {
    this.apiKey = apiKey;

    this.http = axios.create({
      baseURL: `${API_BASE}/user`,
      headers: {
        Accept: 'application/json',
        apikey: this.apiKey
      }
    });

    this.tokenStorage = new TokenStorage();
    this.attendance = new Attendance(this.apiKey, this.http);
    // this.scores = new Scores(this.apiKey, this.http);
  }

  /**
   * Получает токен авторизации студента.
   * @param {string} login - Логин студента.
   * @param {string} password - Пароль студента.
   * @returns {Promise<AuthResponseDto>} Ответ с токеном и информацией о пользователе.
   * @throws {Error} Если не удалось выполнить вход или произошла ошибка API.
   */
  // @ts-ignore
  async getToken(login: string, password: string): Promise<AuthResponseDto> {
    const response = await this.http.post<ApiResponseDto<AuthResponseDto>>('login', {
      login,
      password
    });

    if (response.status !== 200) {
      throw new Error(`Не удалось выполнить вход:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }

  /**
   * Получает информацию о текущем пользователе.
   * @returns {Promise<AuthResponseDto>} Ответ с информацией о пользователе.
   * @throws {Error} Если не удалось получить информацию о пользователе или произошла ошибка API.
   */
  async getCurrentUser(): Promise<UserDto> {
    const response = await this.http.get<ApiResponseDto<UserDto>>('');

    if (response.status !== 200) {
      throw new Error(`Не удалось получить информацию о пользователе:\n${response.data}`);
    }

    if (!response.data.success) {
      throw new Error(`Ошибка API: ${response.data}`);
    }

    return response.data.data;
  }
}

export default Student;
