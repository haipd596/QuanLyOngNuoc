import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import { USER_PROFILE_ROUTE } from "../../constants";
import ProfilePage from "./ProfilePage";

export const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: USER_PROFILE_ROUTE,
  component: ProfilePage,
});

export default userProfileRoute;
