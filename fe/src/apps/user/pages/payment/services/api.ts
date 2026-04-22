import { axiosPublicClient } from "@configs/axios";

import type { IResponsePagination } from "@/shared/types/response.type";

import type { IProvince, IWard } from "./types";

export const getPublicProvinces = (): Promise<IResponsePagination<IProvince>> => {
  return axiosPublicClient.get(
    "/TinhXaPhuongCongKhai/tinh-cong-khai?page=1&pageSize=1000"
  );
};

export const getPublicWards = (
  provinceId: number
): Promise<IResponsePagination<IWard>> => {
  return axiosPublicClient.get(
    `/TinhXaPhuongCongKhai/xa-cong-khai?Query.TinhThanhId=${provinceId}&page=1&pageSize=1000`
  );
};
