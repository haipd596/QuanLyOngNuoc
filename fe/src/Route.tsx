import {
  Outlet,
  redirect,
  createRoute,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router'
import NotFound404 from '@shared/components/404'
import { publicRoute } from './apps/home/Route';
import { HOME_ROUTE } from './apps/home/constants';
import authRoute from './apps/auth/Route';
import userRoute from './apps/user/Route';
import adminRoute from './apps/admin/Route';
import sellerRoute from './apps/seller/Route';

export const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound404,
  // // Hook chạy trước khi load bất kỳ route con nào
  // beforeLoad: async ({ location }) => {
  //   const accessToken = tokenManager.getAccessToken();
  //   const loggedIn = !!accessToken
  //   // Nếu chưa đăng nhập và không đang ở trang login
  //   if (!loggedIn && !location.pathname.startsWith(LOGIN_ROUTE)) {
  //     throw redirect({
  //       to: LOGIN_ROUTE,
  //       search: {
  //         redirect: location.href, // lưu lại URL gốc để quay lại sau
  //       },
  //     })
  //   }
  // },
})

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}

const indexRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: HOME_ROUTE });
  },
});

export const routeTree = rootRoute.addChildren([
  indexRedirectRoute,
  publicRoute,
  authRoute,
  userRoute,
  adminRoute,
  sellerRoute,
]);

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

export default router;
