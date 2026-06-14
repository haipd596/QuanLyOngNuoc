import { createRoute, Outlet } from '@tanstack/react-router';
import { rootRoute } from '@/Route';
import aboutRoute from './pages/About/Route';
import contactRoute from './pages/Contact/Route';
import homeRoute from './pages/Home/Route';
import productDetailRoute from './pages/ProductDetail/Route';
import productsRoute from './pages/Products/Route';
import newsRoute from './pages/News/Route';

export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => <Outlet />,
})
publicRoute.addChildren([
  aboutRoute,
  contactRoute,
  homeRoute,
  productDetailRoute,
  productsRoute,
  newsRoute,
])
export default publicRoute;
