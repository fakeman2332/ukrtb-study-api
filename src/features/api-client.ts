import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { ApiResponseDto } from '@/types/api-response-dto';

class BaseApiClient {
  protected readonly http: AxiosInstance;

  constructor(baseURL: string, apiKey: string, authToken?: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        apikey: apiKey,
        ...(authToken && { Authorization: `Bearer ${authToken}` })
      }
    });
  }

  public async makeRequest<T>(method: 'get' | 'post', url: string, data?: unknown, params?: unknown): Promise<T> {
    try {
      const response = await this.http[method]<ApiResponseDto<T>>(url, method === 'post' ? data : { params });

      if (response.status === 204 || !response.data) {
        return [] as unknown as T;
      }

      if (!response.data.success) {
        throw new Error(`API Error: ${response.data.message || 'Unknown error'}`);
      }

      return response.data.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): never {
    if (error.response) {
      const errorData = error.response.data as { message?: string };
      const message = errorData?.message || error.message;
      const status = error.response.status;

      switch (status) {
        case 401:
          throw new Error('Не авторизован: Токен доступа истек или недействителен');
        case 403:
          throw new Error('Запрещено: У вас нет доступа к этому ресурсу');
        case 404:
          throw new Error('Не найдено: Запрашиваемый ресурс не существует');
        default:
          throw new Error(`Ошибка сервера (${status}): ${message}`);
      }
    } else if (error.request) {
      throw new Error('Ошибка сети: Не удалось получить ответ от сервера');
    }
    throw error;
  }
}

export { BaseApiClient };
