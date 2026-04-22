import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import GoogleCallbackPage from "./GoogleCallbackPage";
import { GOOGLE_CALLBACK_ROUTE } from "../../constants";

export const googleCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: GOOGLE_CALLBACK_ROUTE,
  component: GoogleCallbackPage,
});
