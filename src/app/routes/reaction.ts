import { Router } from 'express';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import reactionSchemasValidation from '../validation/reaction';
import reactionControllers from '../controllers/reaction';

const router = Router();

// reaction a post or comment
router.put(
  '/',
  auth(),
  validateRequest(reactionSchemasValidation.reactionPostOrComment),
  reactionControllers.reactionPostOrComment,
);

// delete reaction
router.delete('/:id', auth(), reactionControllers.deleteReaction);

// get reaction by post id
router.get('/post/:id', auth(), reactionControllers.getReactionByPostId);

// get reaction by comment id
router.get('/comment/:id', auth(), reactionControllers.getReactionByCommentId);

const reactionRoutes = router;
export default reactionRoutes;
