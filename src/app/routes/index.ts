import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';

const routes = Router();

const routeItems = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

routeItems.forEach((route) => routes.use(route.path, route.route));

export default routes;
