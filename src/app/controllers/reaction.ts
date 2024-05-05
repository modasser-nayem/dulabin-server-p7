import reactionServices from '../services/reaction';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const reactionPostOrComment = catchAsync(async (req, res) => {
  const result = await reactionServices.reactionPostOrComment({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully Added',
    data: result,
  });
});

const deleteReaction = catchAsync(async (req, res) => {
  const result = await reactionServices.deleteReaction({
    user: req.user,
    reactionId: req.params.id,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully Deleted',
    data: result,
  });
});

const getReactionByPostId = catchAsync(async (req, res) => {
  const result = await reactionServices.getReactionByPostId({
    postId: req.params.id,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully get all reaction',
    data: result,
  });
});

const getReactionByCommentId = catchAsync(async (req, res) => {
  const result = await reactionServices.getReactionByCommentId({
    commentId: req.params.id,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully get all reaction',
    data: result,
  });
});

const reactionControllers = {
  reactionPostOrComment,
  deleteReaction,
  getReactionByPostId,
  getReactionByCommentId,
};
export default reactionControllers;
