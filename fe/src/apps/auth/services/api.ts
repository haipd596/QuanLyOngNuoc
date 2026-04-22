import axiosClient from "@/configs/axios";
import type { IResponse } from "@/shared/types/response.type";
import type { ILogin, IAuthPayload, IRegister } from "./types";

export const postLogin = (
  body: ILogin
): Promise<IResponse<IAuthPayload>> => {
  return axiosClient.post(`/auth/login`, body);
};

export const getGoogleLoginUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
  return `${baseUrl}/auth/google`;
};

export const getGoogleCallback = (
  code: string
): Promise<IResponse<IAuthPayload>> => {
  return axiosClient.get(`/auth/google/callback`, {
    params: { code },
  });
};

export const postRegister = (
  body: IRegister
): Promise<IResponse<IAuthPayload>> => {
  return axiosClient.post(`/auth/register`, body);
};