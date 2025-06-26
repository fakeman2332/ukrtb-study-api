import type { AuthResponse, User } from '@/types/auth-response';
import { API_BASE } from '@/globals';
import axios, { type AxiosInstance } from 'axios';
import type { ApiResponse } from '@/types/api-response';
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
      },
      transformRequest: [
        (data, headers) => {
          const token = this.tokenStorage.getToken();

          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          return data;
        }
      ]
    });

    this.tokenStorage = new TokenStorage();
    this.attendance = new Attendance(this.apiKey, this.http);
    // this.scores = new Scores(this.apiKey, this.http);
  }

  /**
   * Получает токен авторизации студента.
   * @param {string} login - Логин студента.
   * @param {string} password - Пароль студента.
   * @returns {Promise<AuthResponse>} Ответ с токеном и информацией о пользователе.
   * @throws {Error} Если не удалось выполнить вход или произошла ошибка API.
   */
  async getToken(login: string, password: string): Promise<AuthResponse> {
    const response = await this.http.post<ApiResponse<AuthResponse>>('login', {
      params: {
        login,
        password
      }
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
   * @returns {Promise<AuthResponse>} Ответ с информацией о пользователе.
   * @throws {Error} Если не удалось получить информацию о пользователе или произошла ошибка API.
   */
  async getCurrentUser(): Promise<User> {
    const response = await this.http.get<ApiResponse<User>>('');

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
