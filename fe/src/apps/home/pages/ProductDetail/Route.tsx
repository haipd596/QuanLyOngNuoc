import { createRoute } from "@tanstack/react-router";
import { PRODUCT_DETAIL_ROUTE } from "../../constants";
import publicRoute from "../../Route";
import ProductDetailPage from "./ProductDetailPage";

export const productDetailRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: PRODUCT_DETAIL_ROUTE,
  component: ProductDetailPage,
});

export default productDetailRoute;
