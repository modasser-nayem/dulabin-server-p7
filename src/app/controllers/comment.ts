import commentServices from '../services/comment';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createComment = catchAsync(async (req, res) => {
  const result = await commentServices.createComment({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    code: 201,
    success: true,
    message: 'Comment is successfully created!',
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const result = await commentServices.updateComment({
    user: req.user,
    commentId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Comment is successfully updated!',
    data: result,
  });
});

const updateCommentStatus = catchAsync(async (req, res) => {
  const result = await commentServices.updateCommentStatus({
    user: req.user,
    commentId: req.params.id,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Comment status is successfully updated!',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const result = await commentServices.deleteComment({
    user: req.user,
    commentId: req.params.id,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Comment is successfully deleted!',
    data: result,
  });
});

const getAllCommentByPostId = catchAsync(async (req, res) => {
  const result = await commentServices.getAllCommentByPostId({
    postId: req.params.id,
    user: req.user,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'All comments are successfully retrieved',
    data: result,
  });
});

const commentControllers = {
  createComment,
  updateComment,
  updateCommentStatus,
  deleteComment,
  getAllCommentByPostId,
};
export default commentControllers;
