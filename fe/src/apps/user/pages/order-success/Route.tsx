import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import { USER_ORDER_SUCCESS_ROUTE } from "../../constants";
import OrderSuccessPage from "./OrderSuccessPage";

export const userOrderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: USER_ORDER_SUCCESS_ROUTE,
  component: OrderSuccessPage,
});

export default userOrderSuccessRoute;
