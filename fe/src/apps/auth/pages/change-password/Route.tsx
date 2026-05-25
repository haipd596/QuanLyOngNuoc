import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import ChangePasswordPage from "./ChangePasswordPage";
import { CHANGE_PASSWORD_ROUTE } from "../../constants";

export const changePasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: CHANGE_PASSWORD_ROUTE,
  component: ChangePasswordPage,
});
