import { TRequestFor } from '../interfaces/friendship';
import friendshipServices from '../services/friendship';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const sendFriendRequest = catchAsync(async (req, res) => {
  const result = await friendshipServices.sendFriendRequest({
    requestUser: req.user,
    userId: req.body.userId,
  });

  sendResponse(res, {
    code: 201,
    success: true,
    message: 'Send Friend Request',
    data: result,
  });
});

const acceptFriendRequest = catchAsync(async (req, res) => {
  const result = await friendshipServices.acceptFriendRequest({
    user: req.user,
    requestId: req.body.userId,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Accept Friend Request',
    data: result,
  });
});

const deleteFriendOrFriendRequest = catchAsync(async (req, res) => {
  const result = await friendshipServices.deleteFriendOrFriendRequest({
    user: req.user,
    userId: req.body.userId,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully deleted',
    data: result,
  });
});

const deleteMySendRequest = catchAsync(async (req, res) => {
  const result = await friendshipServices.deleteMySendRequest({
    user: req.user,
    userId: req.body.userId,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Delete send request',
    data: result,
  });
});

const followORUunfollowUser = catchAsync(async (req, res) => {
  const result = await friendshipServices.followORUunfollowUser({
    user: req.user,
    userId: req.body.userId,
  });

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Successfully updated',
    data: result,
  });
});

const getFriendships = catchAsync(async (req, res) => {
  const queryString = (req.query.requestFor as TRequestFor) || 'friends';
  const result = await friendshipServices.getFriendships({
    user: req.user,
    requestFor: queryString,
  });
  sendResponse(res, {
    code: 200,
    success: true,
    message: `Get all ${queryString}`,
    data: result,
  });
});

const friendshipControllers = {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendOrFriendRequest,
  deleteMySendRequest,
  getFriendships,
  followORUunfollowUser,
};
export default friendshipControllers;
