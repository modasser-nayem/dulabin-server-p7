import { Router } from 'express';
import auth from '../middlewares/auth';
import userControllers from '../controllers/user';
import validateRequest from '../middlewares/validateRequest';
import userSchemasValidation from '../validation/user';

const router = Router();

// get my profile
router.get('/me', auth(), userControllers.getMyProfile);

// get user profile
router.get('/:username', auth(), userControllers.getUserProfile);

// update my profile
router.put(
  '/me',
  auth(),
  validateRequest(userSchemasValidation.updateUserProfile),
  userControllers.updateMyProfile,
);

// get all users
router.get('/', auth(), userControllers.getAllUsers);

const userRoutes = router;
export default userRoutes;
