import { createRoute } from "@tanstack/react-router";
import { NEWS_ROUTE } from "../../constants";
import NewsPage from "./News";
import publicRoute from "../../Route";

export const newsRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: NEWS_ROUTE,
    component: NewsPage,
})

export default newsRoute;
