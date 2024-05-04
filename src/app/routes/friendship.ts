import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import friendshipSchemasValidation from '../validation/friendship';
import auth from '../middlewares/auth';
import friendshipControllers from '../controllers/friendship';

const router = Router();

// get all friends
router.get('/', auth(), friendshipControllers.getFriendships);

// send friend request
router.post(
  '/',
  auth(),
  validateRequest(friendshipSchemasValidation.friendship),
  friendshipControllers.sendFriendRequest,
);

// accept friend request
router.patch(
  '/',
  auth(),
  validateRequest(friendshipSchemasValidation.friendship),
  friendshipControllers.acceptFriendRequest,
);

// delete friend or friendRequest
router.delete(
  '/',
  auth(),
  validateRequest(friendshipSchemasValidation.friendship),
  friendshipControllers.deleteFriendOrFriendRequest,
);

// delete send My Request
router.delete(
  '/my-request',
  auth(),
  validateRequest(friendshipSchemasValidation.friendship),
  friendshipControllers.deleteMySendRequest,
);

// unFollow user
router.patch(
  '/follow',
  auth(),
  validateRequest(friendshipSchemasValidation.friendship),
  friendshipControllers.followORUunfollowUser,
);

const friendshipRoutes = router;
export default friendshipRoutes;
