import type { IUser, MenuItem } from "@/shared/services/type";
import type { IResponse } from "@/shared/types/response.type";
import axiosClient from "@configs/axios";
import { objectToFormData, stringtifyQuery } from "@shared/utils";
import tokenManager from "@utils/tokenManager";

/** Lấy thông tin user */
export const getUserInfo = async () => {
  const accessToken = tokenManager.getAccessToken();
  if (!accessToken) return;

  // Use CNTC account detail endpoint (backend provides current user info based on token)
  const url = "/cntc/CNTC_TaiKhoan/Chi-Tiet-Tai-Khoan";
  // axiosClient interceptor returns response.data which is the API wrapper:
  // { code, success, message, data: {...} }
  const wrapper: any = await axiosClient.get<any>(url);
  const data: any = wrapper?.data ?? wrapper;
  if (!data) return;

  // Map backend fields to our IUser shape where needed (backend returns `id`, `ten`, `sdt`, etc.)
  const mappedUser: Partial<IUser> = {
    ...data,
    nhanVienID: data.nhanVienID ?? data.id,
    hoTen: data.hoTen ?? data.ten,
    soDienThoai: data.soDienThoai ?? data.sdt,
  };

  return mappedUser as IUser;
};
/** Lấy menu user */
export const getMenuUser = async (): Promise<IResponse<MenuItem[]>> => {
  const res = await axiosClient.get<IResponse<MenuItem[]>>(
    "/Menu/lay-menu-theo-nguoi-dung",
  );
  return res.data;
};

/** Single Upload  File */
export const singleUploadFile = (payload: any): Promise<IResponse<string>> => {
  const url = "/UploadFile/single";
  return axiosClient.post(url, objectToFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/** Multi Upload File */
export const multiUploadFile = (payload: any): Promise<IResponse<string[]>> => {
  const url = "/UploadFile/multiple";
  return axiosClient.post(url, objectToFormData(payload), {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
/** Xóa file */
export const deleteFile = (payload: any): Promise<IResponse<boolean>> => {
  const params = stringtifyQuery(payload);
  const url = `/UploadFile?${params}`;
  return axiosClient.delete(url);
};
/** Download file bằng path */
export const downloadFile = (payload: { objectName: string }) => {
  const params = stringtifyQuery(payload);
  const url = `/UploadFile/download?${params}`;
  return axiosClient.get(url);
};

/** Download file bằng path */
export const downloadFileBlob = (payload: { objectName: string }) => {
  const params = stringtifyQuery(payload);
  const url = `/UploadFile/download?${params}`;

  return axiosClient.get(url, {
    responseType: "arraybuffer", // 🔑 QUAN TRỌNG
  });
};

export const downloadFilePublic = (payload: { objectName: string }) => {
  const params = stringtifyQuery(payload);
  const url = `/congkhai/UploadFileCongKhai/download?${params}`;

  return axiosClient.get(url, {
    responseType: "arraybuffer",
  });
};

export const fetchCountryCodes = (): Promise<any> => {
  return axiosClient.get("/QuocGiaCongKhai/lay-danh-sach-ma-dien-thoai", {
    params: { Page: 1, PageSize: 100 },
  });
};
