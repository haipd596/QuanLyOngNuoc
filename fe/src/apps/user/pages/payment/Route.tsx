import { rootRoute } from "@/Route";
import { createRoute, redirect } from "@tanstack/react-router";
import { HOME_ROUTE } from "@/apps/home/constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { lcStorage } from "@/shared/utils";
import { canUseCart } from "@/shared/utils/roleAccess";
import { USER_PAYMENT_ROUTE } from "../../constants";
import PaymentPage from "./PaymentPage";

export const userPaymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: USER_PAYMENT_ROUTE,
  beforeLoad: () => {
    const currentUser = lcStorage.get<{ role?: string }>(LOCAL_STORAGE_KEYS.user);
    if (currentUser && !canUseCart(currentUser.role)) {
      throw redirect({ to: HOME_ROUTE });
    }
  },
  component: PaymentPage,
});

export default userPaymentRoute;
