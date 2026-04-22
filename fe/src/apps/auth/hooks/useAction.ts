import { LOCAL_STORAGE_KEYS } from "@/constants";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import tokenManager from "@/shared/utils/tokenManager";
import { useCreateLogin, useCreateRegister, useGoogleCallback } from "../services/mutation";
import { getGoogleLoginUrl } from "../services/api";
import type { IAuthPayload, ILogin, IRegister } from "../services/types";

export const useAction = () => {
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const loginMutation = useCreateLogin();
  const registerMutation = useCreateRegister();
  const googleCallbackMutation = useGoogleCallback();

  const persistAuthData = (data?: IAuthPayload) => {
    if (!data) return;

    if (data.user) {
      lcStorage.set(LOCAL_STORAGE_KEYS.user, data.user);
    }

    if (data.accessToken) {
      tokenManager.setAccessToken(data.accessToken);
    }

    if (data.refreshToken) {
      tokenManager.setRefreshToken(data.refreshToken);
    }
  };

  const handleLogin = (values: ILogin, onSuccess?: () => void) => {
    loginMutation.mutate(
      { body: values },
      {
        onSuccess: (res) => {
          if (res.success) {
            persistAuthData(res.data);
            showSuccessNotify("Đăng nhập thành công");
            onSuccess?.();
          } else {
            showErrorNotify(res.message || "Đăng nhập thất bại");
          }
        },
        onError: (error: any) => {
          showErrorNotify(error?.data?.message || error?.message || "Có lỗi xảy ra!");
        },
      }
    );
  };

  const handleRegister = (values: IRegister, onSuccess?: () => void) => {
    registerMutation.mutate(
      { body: values },
      {
        onSuccess: (res) => {
          if (res.success) {
            persistAuthData(res.data);
            showSuccessNotify(res.message || "Đăng ký thành công");
            onSuccess?.();
          } else {
            showErrorNotify(res.message || "Đăng ký thất bại");
          }
        },
        onError: (error: any) => {
          showErrorNotify(error?.data?.message || error?.message || "Có lỗi xảy ra!");
        },
      }
    );
  };

  const handleGoogleRedirect = () => {
    window.location.href = getGoogleLoginUrl();
  };

  const handleGoogleCallback = (code: string, onSuccess?: () => void) => {
    googleCallbackMutation.mutate(
      { code },
      {
        onSuccess: (res) => {
          if (res.success) {
            persistAuthData(res.data);
            showSuccessNotify(res.message || "Đăng nhập Google thành công");
            onSuccess?.();
          } else {
            showErrorNotify(res.message || "Đăng nhập Google thất bại");
          }
        },
        onError: (error: any) => {
          showErrorNotify(error?.data?.message || error?.message || "Có lỗi xảy ra!");
        },
      }
    );
  };

  return {
    handleLogin,
    handleRegister,
    handleGoogleRedirect,
    handleGoogleCallback,
    isLoading: loginMutation.isLoading,
    isRegisterLoading: registerMutation.isLoading,
    isGoogleLoading: googleCallbackMutation.isLoading,
  };
};

export default useAction;
