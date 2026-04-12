import axios from 'axios';
import { notification } from 'antd';
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import type { IResponse } from '../shared/types/response.type';
import tokenManager from '@utils/tokenManager';
import { handleRefreshToken } from '@/shared/utils/refreshToken';

export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // ✅ chỉ giữ token
  const accessToken = tokenManager.getAccessToken();

  if (accessToken && config.headers) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  config.validateStatus = function (status) {
    return (status >= 200 && status < 300) || status === 404;
  };

  return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const handlePublicRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.validateStatus = function (status) {
    return (status >= 200 && status < 300) || status === 404;
  };

  return config;
};

const handleResponse = (response: AxiosResponse) => {
  return response.data;
};

const handleResponseError = async (error: AxiosError<IResponse<any>>) => {
  console.log('Request error: ', { error });

  const originalRequest = error.config as IOriginRequest;

  // ✅ refresh token
  if (error.response?.status === 401 && !originalRequest?._retry) {
    return handleRefreshToken(originalRequest);
  }

  // server error
  if (error.response?.status === 500) {
    notification.error({
      message: 'Thất bại!',
      description: 'Đã có lỗi xảy ra',
    });
    return Promise.reject(error.response);
  }

  // show error message
  if (error.response?.status !== 404 && error.response?.status !== 403) {
    notification.error({
      message: 'Thất bại!',
      description: error.response?.data?.message || error.message,
    });
  }

  return Promise.reject(error.response);
};

// 🔹 API chính
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 API news
const axiosNewsClient = axios.create({
  baseURL: import.meta.env.VITE_ARTICLE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPublicClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptors
axiosClient.interceptors.request.use(handleRequest as any, handleRequestError);
axiosClient.interceptors.response.use(handleResponse, handleResponseError);

axiosNewsClient.interceptors.request.use(handleRequest as any, handleRequestError);
axiosNewsClient.interceptors.response.use(handleResponse, handleResponseError);

axiosPublicClient.interceptors.request.use(handlePublicRequest as any, handleRequestError);
axiosPublicClient.interceptors.response.use(handleResponse, handleResponseError);

export default axiosClient;
export { axiosClient, axiosNewsClient, axiosPublicClient };
