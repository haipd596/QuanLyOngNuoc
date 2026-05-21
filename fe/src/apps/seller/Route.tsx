import { rootRoute } from "@/Route";
import { LOGIN_ROUTE } from "@/apps/auth/constants";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { lcStorage } from "@/shared/utils";
import { createRoute, redirect } from "@tanstack/react-router";
import { SELLER_CONTACT_MESSAGES_ROUTE, SELLER_DASHBOARD_ROUTE, SELLER_ROUTE } from "./constants";
import SellerLayoutPage from "./pages/layout/SellerLayoutPage";
import SellerDashboardPage from "./pages/dashboard/SellerDashboardPage";
import SellerOrdersPage from "./pages/orders/SellerOrdersPage";
import SellerCancelReasonsPage from "./pages/cancel-reasons/SellerCancelReasonsPage";
import SellerContactMessagesPage from "./pages/contact-messages/SellerContactMessagesPage";

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

export const sellerCancelReasonsRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: "cancel-reasons",
  component: SellerCancelReasonsPage,
});

export const sellerContactMessagesRoute = createRoute({
  getParentRoute: () => sellerRoute,
  path: SELLER_CONTACT_MESSAGES_ROUTE.replace(`${SELLER_ROUTE}/`, ""),
  component: SellerContactMessagesPage,
});

sellerRoute.addChildren([
  sellerDashboardRoute,
  sellerOrdersRoute,
  sellerCancelReasonsRoute,
  sellerContactMessagesRoute,
]);

export default sellerRoute;
