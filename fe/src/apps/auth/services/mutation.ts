import type { IResponse } from "@/shared/types/response.type";
import { useMutation } from "react-query";
import type { ILogin, IAuthPayload, IRegister } from "./types";
import { getGoogleCallback, postLogin, postRegister } from "./api";

export const useCreateLogin = () => {
  return useMutation<
    IResponse<IAuthPayload>,
    Error,
    { body: ILogin }
  >({
    mutationFn: ({ body }) => postLogin(body),
  });
};

export const useGoogleCallback = () => {
  return useMutation<
    IResponse<IAuthPayload>,
    Error,
    { code: string }
  >({
    mutationFn: ({ code }) => getGoogleCallback(code),
  });
};

export const useCreateRegister = () => {
  return useMutation<
    IResponse<IAuthPayload>,
    Error,
    { body: IRegister }
  >({
    mutationFn: ({ body }) => postRegister(body),
  });
};