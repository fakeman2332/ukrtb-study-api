import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { API_BASE } from '@/globals';
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

  public async makeRequest<T>(method: 'get' | 'post', url: string, data?: any, params?: any): Promise<T> {
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
      const errorData = error.response.data as any;
      const message = errorData?.message || error.message;
      const status = error.response.status;

      switch (status) {
        case 401:
          throw new Error('Unauthorized: Invalid or expired token');
        case 403:
          throw new Error('Forbidden: Access denied');
        case 404:
          throw new Error('Not found: Resource does not exist');
        default:
          throw new Error(`Server error (${status}): ${message}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to server');
    }
    throw error;
  }
}

export { BaseApiClient };
