import { rootRoute } from "@/Route";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { lcStorage } from "@/shared/utils";
import { createRoute, redirect } from "@tanstack/react-router";
import {
  SELLER_DASHBOARD_ROUTE,
  SELLER_ROUTE,
} from "./constants";
import SellerLayoutPage from "./pages/layout/SellerLayoutPage";
import SellerDashboardPage from "./pages/dashboard/SellerDashboardPage";
import SellerOrdersPage from "./pages/orders/SellerOrdersPage";
import SellerProductsPage from "./pages/products/SellerProductsPage";
import SellerDeliveryPage from "./pages/delivery/SellerDeliveryPage";
import SellerReportsPage from "./pages/reports/SellerReportsPage";

export const sellerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: SELLER_ROUTE,
  component: SellerLayoutPage,
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

export const sellerOrdersRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: "orders",
  component: SellerOrdersPage,
});

export const sellerProductsRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: "products",
  component: SellerProductsPage,
});

export const sellerDeliveryRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: "delivery",
  component: SellerDeliveryPage,
});

export const sellerReportsRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: "reports",
  component: SellerReportsPage,
});

sellerRoute.addChildren([
  sellerDashboardRoute,
  sellerOrdersRoute,
  sellerProductsRoute,
  sellerDeliveryRoute,
  sellerReportsRoute,
]);

export default sellerRoute;
