import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@/Route';
import { loginRoute } from './pages/login/Route';
import { registerRoute } from './pages/register/Route';
import { forgotPasswordRoute } from './pages/forgot-password/Route';
import { googleCallbackRoute } from './pages/oauth/Route';
import { AUTH_ROUTE } from './constants';

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AUTH_ROUTE,
  component: () => null,
});

authRoute.addChildren([loginRoute, registerRoute, forgotPasswordRoute, googleCallbackRoute]);

export default authRoute;
