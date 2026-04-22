import { createRoute } from "@tanstack/react-router";
import { HOME_ROUTE } from "../../constants";
import HomePage from "./Home";
import publicRoute from "../../Route";

export const homeRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: HOME_ROUTE,
    component: HomePage,
})

export default homeRoute;