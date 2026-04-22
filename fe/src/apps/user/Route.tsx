import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/Route";
import { USER_ROUTE } from "./constants";
import { userOrderSuccessRoute } from "./pages/order-success/Route";
import { userPaymentRoute } from "./pages/payment/Route";
import { userProfileRoute } from "./pages/profile/Route";
import userOrderPendingRoute from "./pages/order-pending/Route";

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: USER_ROUTE,
  component: () => null,
});

userRoute.addChildren([
  userProfileRoute,
  userPaymentRoute,
  userOrderPendingRoute,
  userOrderSuccessRoute,
]);

export default userRoute;
