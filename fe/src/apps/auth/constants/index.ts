import { ADMIN_DASHBOARD_ROUTE } from "@/apps/admin/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { SELLER_DASHBOARD_ROUTE } from "@/apps/seller/constants";

export const AUTH_ROUTE = "/auth";
export const REFRESH_TOKEN_URL = `${AUTH_ROUTE}/refresh`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const REGISTER_ROUTE = `${AUTH_ROUTE}/register`;
export const FORGOT_PASSWORD_ROUTE = `${AUTH_ROUTE}/forgot-password`;
export const GOOGLE_CALLBACK_ROUTE = `${AUTH_ROUTE}/google/callback`;

export const ROLE_ROUTE_MAP: Record<string, string> = {
  ADMIN: ADMIN_DASHBOARD_ROUTE,
  SELLER: SELLER_DASHBOARD_ROUTE,
  CUSTOMER: HOME_ROUTE,
};