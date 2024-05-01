import { Router } from 'express';
import authControllers from '../controllers/auth';
import validateRequest from '../middlewares/validateRequest';
import authSchemasValidation from '../validation/auth';
import auth from '../middlewares/auth';

const router = Router();

// register user
router.post(
  '/register',
  validateRequest(authSchemasValidation.registerUser),
  authControllers.registerUser,
);

// login user
router.post(
  '/login',
  validateRequest(authSchemasValidation.loginUser),
  authControllers.loginUser,
);

// refresh token
router.post(
  '/refresh-token',
  validateRequest(authSchemasValidation.refreshToken),
  authControllers.refreshToken,
);

// change password
router.post(
  '/change-password',
  auth(),
  validateRequest(authSchemasValidation.changePassword),
  authControllers.changePassword,
);

// forgot password
router.post(
  '/forgot-password',
  validateRequest(authSchemasValidation.forgotPassword),
  authControllers.forgotPassword,
);

// reset-password
router.post(
  '/reset-password',
  validateRequest(authSchemasValidation.resetPassword),
  authControllers.resetPassword,
);

const authRoutes = router;
export default authRoutes;
