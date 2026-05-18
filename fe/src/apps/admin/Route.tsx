import { rootRoute } from "@/Route";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { lcStorage } from "@/shared/utils";
import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { ADMIN_DASHBOARD_ROUTE, ADMIN_ROUTE } from "./constants";
import AdminDashboardPage from "./pages/dashboard/AdminDashboardPage";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ADMIN_ROUTE,
  component: () => <Outlet />,
  beforeLoad: ({ location }) => {
    const accessToken = lcStorage.get<string>(LOCAL_STORAGE_KEYS.accessToken);
    const user = lcStorage.get<{ role?: string }>(LOCAL_STORAGE_KEYS.user);

    if (!accessToken) {
      throw redirect({
        to: LOGIN_ROUTE,
        search: {
          redirect: location.href,
        },
      });
    }

    if (user?.role !== "ADMIN") {
      throw redirect({ to: HOME_ROUTE });
    }

    if (location.pathname === ADMIN_ROUTE) {
      throw redirect({ to: ADMIN_DASHBOARD_ROUTE });
    }
  },
});

export const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "dashboard",
  component: AdminDashboardPage,
});

adminRoute.addChildren([adminDashboardRoute]);

export default adminRoute;
