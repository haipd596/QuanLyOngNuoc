import { rootRoute } from "@/Route";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { lcStorage } from "@/shared/utils";
import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { SELLER_DASHBOARD_ROUTE, SELLER_ROUTE } from "./constants";
import SellerDashboardPage from "./pages/dashboard/SellerDashboardPage";

export const sellerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: SELLER_ROUTE,
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

    if (user?.role !== "SELLER") {
      throw redirect({ to: HOME_ROUTE });
    }

    if (location.pathname === SELLER_ROUTE) {
      throw redirect({ to: SELLER_DASHBOARD_ROUTE });
    }
  },
});

export const sellerDashboardRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: "dashboard",
  component: SellerDashboardPage,
});

sellerRoute.addChildren([sellerDashboardRoute]);

export default sellerRoute;
