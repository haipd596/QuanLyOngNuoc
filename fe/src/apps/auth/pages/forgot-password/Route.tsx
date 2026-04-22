import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { FORGOT_PASSWORD_ROUTE } from "../../constants";

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: FORGOT_PASSWORD_ROUTE,
  component: ForgotPasswordPage,
});
