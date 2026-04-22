import { useQuery, type UseQueryOptions, type UseQueryResult } from "react-query";

import type { IResponse } from "@/shared/types/response.type";

import { getMyProfile } from "./api";
import type { IUserMe } from "./types";

export const USER_ME_QUERY_KEY = ["user-me"];

export const useMyProfileQuery = (
  options?: UseQueryOptions<IResponse<IUserMe>>
): UseQueryResult<IResponse<IUserMe>> => {
  return useQuery({
    queryKey: USER_ME_QUERY_KEY,
    queryFn: () => getMyProfile(),
    ...options,
  });
};
