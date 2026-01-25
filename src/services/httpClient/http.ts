import axios, { AxiosError } from "axios";

export type ApiError = {
  status?: number;
  message: string;
  data?: unknown;
};

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error shape
http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    const apiError: ApiError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ??
        error.message ??
        "Unexpected error",
      data: error.response?.data,
    };

    return Promise.reject(apiError);
  }
);

// External API client for third-party APIs (like DummyJSON)
// No baseURL, no auth headers, no credentials
// TODO: This only for testing API, in production, we should use a different client
export const httpExternal = axios.create({
  timeout: 15000,
});

// Normalize error shape for external APIs
httpExternal.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    const apiError: ApiError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ??
        error.message ??
        "Unexpected error",
      data: error.response?.data,
    };

    return Promise.reject(apiError);
  }
);