import axiosClient from "@configs/axios";

import type { IResponse } from "@/shared/types/response.type";

import type { IUserMe } from "./types";

export const getMyProfile = (): Promise<IResponse<IUserMe>> => {
  return axiosClient.get("/auth/me");
};
