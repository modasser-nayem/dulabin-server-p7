import { Router } from 'express';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import commentSchemasValidation from '../validation/comment';
import commentControllers from '../controllers/comment';

const router = Router();

// create comment
router.post(
  '/',
  auth(),
  validateRequest(commentSchemasValidation.createComment),
  commentControllers.createComment,
);

// update comment
router.put(
  '/:id',
  auth(),
  validateRequest(commentSchemasValidation.updateComment),
  commentControllers.updateComment,
);

// update comment status
router.patch(
  '/:id',
  auth(),
  validateRequest(commentSchemasValidation.updateCommentStatus),
  commentControllers.updateCommentStatus,
);

// delete comment
router.delete('/:id', auth(), commentControllers.deleteComment);

// get all comment by post id
router.get('/:id', auth(), commentControllers.getAllCommentByPostId);

const commentRoutes = router;
export default commentRoutes;
