import { rootRoute } from "@/Route";
import LoginPage from "./LoginPage";
import { LOGIN_ROUTE } from "../../constants";
import { createRoute } from "@tanstack/react-router";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: LOGIN_ROUTE,
  component: LoginPage,
});