import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import postRoutes from './post';

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
  {
    path: '/posts',
    route: postRoutes,
  },
];

routeItems.forEach((route) => routes.use(route.path, route.route));

export default routes;
