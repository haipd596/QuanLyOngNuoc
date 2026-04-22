import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import { USER_ORDER_PENDING_ROUTE } from "../../constants";
import OrderPendingPage from "./OrderPendingPage";

export const userOrderPendingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: USER_ORDER_PENDING_ROUTE,
  component: OrderPendingPage,
});

export default userOrderPendingRoute;
