import { Router } from 'express';
import authControllers from '../controllers/auth';
import validateRequest from '../middlewares/validateRequest';
import authSchemasValidation from '../validation/auth';

const router = Router();

// register user
router.post(
  '/register',
  validateRequest(authSchemasValidation.registerUser),
  authControllers.registerUser,
);

const authRoutes = router;
export default authRoutes;
