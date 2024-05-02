import { Router } from 'express';
import auth from '../middlewares/auth';
import validateRequest from '../middlewares/validateRequest';
import postSchemasValidation from '../validation/post';
import postControllers from '../controllers/post';

const router = Router();

// create post
router.post(
  '/',
  auth(),
  validateRequest(postSchemasValidation.createPost),
  postControllers.createPost,
);

// update post
router.put(
  '/:id',
  auth(),
  validateRequest(postSchemasValidation.updatePost),
  postControllers.updatePost,
);

// get my all post
router.get('/me', auth(), postControllers.getAllMyPost);

// get all post
router.get('/', auth(), postControllers.getAllPost);

// get single post
router.get('/:id', auth(), postControllers.getSinglePost);

// delete post
router.delete('/:id', auth(), postControllers.deletePost);

const postRoutes = router;
export default postRoutes;
