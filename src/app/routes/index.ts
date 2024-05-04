import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import postRoutes from './post';
import commentRoutes from './comment';
import friendshipRoutes from './friendship';

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
    path: '/friendships',
    route: friendshipRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path: '/comments',
    route: commentRoutes,
  },
];

routeItems.forEach((route) => routes.use(route.path, route.route));

export default routes;
