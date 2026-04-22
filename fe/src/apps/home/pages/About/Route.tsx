import { createRoute } from '@tanstack/react-router';
import { ABOUT_US_ROUTE } from '../../constants';
import AboutPage from './AboutPage';
import publicRoute from '../../Route';

export const aboutRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: ABOUT_US_ROUTE,
    component: AboutPage,
})

export default aboutRoute;