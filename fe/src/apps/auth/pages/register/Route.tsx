import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import RegisterPage from "./RegisterPage";
import { REGISTER_ROUTE } from "../../constants";

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: REGISTER_ROUTE,
  component: RegisterPage,
});