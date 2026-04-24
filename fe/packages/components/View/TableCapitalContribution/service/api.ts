import { NgoaiTe } from "@packages/components/View/TableProfit/service/type";
import axiosClient from "~/configs/axios";

export const fetchNgoaiTe = (): Promise<NgoaiTe[]> => {
  return axiosClient
    .get("/NgoaiTe")
    .then((response:any) => {
      return response.data;
    })
    .catch((error:any) => {
      console.error("API NgoaiTe error:", error);
      throw error;
    });
};