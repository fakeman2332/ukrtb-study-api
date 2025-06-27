export type ApiResponseDto<T = any> = {
  success: boolean;
  data: T;

  message?: string;
};
