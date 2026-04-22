import { createRoute } from "@tanstack/react-router";
import { CONTACT_ROUTE } from "../../constants";
import ContactPage from "./Contact";
import publicRoute from "../../Route";

export const contactRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: CONTACT_ROUTE,
  component: ContactPage,
});

export default contactRoute;
