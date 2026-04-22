import { rootRoute } from "@/Route";
import { createRoute } from "@tanstack/react-router";
import { USER_PAYMENT_ROUTE } from "../../constants";
import PaymentPage from "./PaymentPage";

export const userPaymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: USER_PAYMENT_ROUTE,
  component: PaymentPage,
});

export default userPaymentRoute;
