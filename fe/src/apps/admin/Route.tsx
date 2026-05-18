import { rootRoute } from "@/Route";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { lcStorage } from "@/shared/utils";
import { createRoute, redirect } from "@tanstack/react-router";
import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_ROUTE,
} from "./constants";
import AdminLayoutPage from "./pages/layout/AdminLayoutPage";
import AdminOverviewPage from "./pages/overview/AdminOverviewPage";
import AdminOrdersPage from "./pages/orders/AdminOrdersPage";
import AdminProductsPage from "./pages/products/AdminProductsPage";
import AdminCustomersPage from "./pages/customers/AdminCustomersPage";
import AdminReportsPage from "./pages/reports/AdminReportsPage";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ADMIN_ROUTE,
  component: AdminLayoutPage,
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
  component: AdminOverviewPage,
});

export const adminOrdersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "orders",
  component: AdminOrdersPage,
});

export const adminProductsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "products",
  component: AdminProductsPage,
});

export const adminCustomersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "customers",
  component: AdminCustomersPage,
});

export const adminReportsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "reports",
  component: AdminReportsPage,
});

adminRoute.addChildren([
  adminDashboardRoute,
  adminOrdersRoute,
  adminProductsRoute,
  adminCustomersRoute,
  adminReportsRoute,
]);

export default adminRoute;
