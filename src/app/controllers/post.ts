import postServices from '../services/post';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createPost = catchAsync(async (req, res) => {
  const result = await postServices.createPost(req.user, req.body);

  sendResponse(res, {
    code: 201,
    success: true,
    message: 'Post is successfully publish',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const result = await postServices.updatePost(
    req.user,
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Post is successfully updated',
    data: result,
  });
});

const getAllMyPost = catchAsync(async (req, res) => {
  const result = await postServices.getAllMyPost(req.user);
  sendResponse(res, {
    code: 200,
    success: true,
    message: 'All Posts are successfully retrieved',
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await postServices.getAllPost();
  sendResponse(res, {
    code: 200,
    success: true,
    message: 'All Posts are successfully retrieved',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const result = await postServices.getSinglePost(req.params.id);
  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Post is successfully retrieved',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await postServices.deletePost(req.user, req.params.id);
  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Post is successfully deleted',
    data: result,
  });
});

const postControllers = {
  createPost,
  updatePost,
  getAllMyPost,
  getAllPost,
  getSinglePost,
  deletePost,
};
export default postControllers;
