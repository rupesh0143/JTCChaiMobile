export interface ApiError {
  status?: number;
  message: string;
}

export const normalizeApiError = (error: any): ApiError => {
  return {
    status: error?.response?.status,
    message:
      error?.response?.data?.message ||
      error?.message ||
      'Unexpected error occurred',
  };
};