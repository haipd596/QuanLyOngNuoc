import type { UseQueryOptions, UseQueryResult } from "react-query";
import { useQuery } from "react-query";

import {
  fetchCountryCodes,
  getMenuUser,
  getUserInfo,
} from "@/shared/services/api";
import type { CountryCode, IUser, MenuItem } from "@/shared/services/type";
import type { IQueryParams } from "@/shared/types";

export const countryCodesKey = "country-codes";

/**
 * @query
 * @description Lấy thông tin người dùng
 */
export const useGetUserInfo = ({
  options,
}: IQueryParams = {}): UseQueryResult<IUser> => {
  const _options: UseQueryOptions<IUser, any, any> = {
    queryKey: "getUserInfo",
    queryFn: getUserInfo,
    ...options,
  };
  return useQuery(_options);
};
// lấy menu app
export const useMenuUser = ({ options }: IQueryParams = {}): UseQueryResult<
  MenuItem[]
> => {
  const _options: UseQueryOptions<MenuItem[], any, any> = {
    queryKey: ["menuUser"],
    queryFn: getMenuUser,
    ...options,
  };
  return useQuery(_options);
};

export const useCountryCodesQuery = () => {
  return useQuery<CountryCode[]>({
    queryKey: [countryCodesKey],
    queryFn: async () => {
      const res = await fetchCountryCodes();

      if (!res?.success || !res?.data) return [];

      // Map object { "id": "code", ... } → [{ id, code }]
      return Object.entries(res.data as Record<string, string>).map(
        ([id, code]) => ({ id, code }),
      );
    },
    refetchOnWindowFocus: false,
  });
};
