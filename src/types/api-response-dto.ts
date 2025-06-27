export type ApiResponseDto<T = unknown> = {
  success: boolean;
  data: T;

  message?: string;
};
