import { createRoute } from "@tanstack/react-router";
import { PRODUCTS_ROUTE } from "../../constants";
import ProductsPage from "./Products";
import publicRoute from "../../Route";

export const productsRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: PRODUCTS_ROUTE,
    component: ProductsPage,
})

export default productsRoute;
