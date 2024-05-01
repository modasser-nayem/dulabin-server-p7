import { Router } from 'express';
import authRoutes from './auth';

const routes = Router();

const routeItems = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

routeItems.forEach((route) => routes.use(route.path, route.route));

export default routes;
