import { JwtPayload } from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { TRequestFor } from '../interfaces/friendship';
import AppError from '../errors/AppError';
import { Prisma } from '@prisma/client';

const getFriendships = async (payload: {
  user: JwtPayload;
  requestFor: TRequestFor;
}) => {
  const { user, requestFor } = payload;

  let whereCondition: Prisma.FriendshipWhereInput = {};

  if (requestFor === 'friendRequest') {
    whereCondition = {
      userId: user.id,
      isApproved: false,
    };
  } else if (requestFor === 'sendRequest') {
    whereCondition = {
      requestId: user.id,
      isApproved: false,
    };
  } else if (requestFor === 'followers') {
    whereCondition = {
      userId: user.id,
      following: true,
    };
  } else if (requestFor === 'following') {
    whereCondition = {
      requestId: user.id,
      following: true,
    };
  } else {
    whereCondition = {
      userId: user.id,
      isApproved: true,
    };
  }

  const result = await prisma.friendship.findMany({
    where: whereCondition,
  });

  return result;
};

const sendFriendRequest = async (payload: {
  requestUser: JwtPayload;
  userId: string;
}) => {
  const { requestUser, userId } = payload;

  if (requestUser.id === userId) {
    throw new AppError(400, "You can't friend with own account");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(400, 'Invalid user id');
  }

  const result = await prisma.friendship.create({
    data: {
      userId: user.id,
      requestId: requestUser.id,
    },
  });

  return result;
};

const acceptFriendRequest = async (payload: {
  user: JwtPayload;
  requestId: string;
}) => {
  const { user, requestId } = payload;

  if (user.id === requestId) {
    throw new AppError(400, "You can't accept own request");
  }

  const requestUser = await prisma.user.findUnique({
    where: { id: requestId },
  });

  if (!requestUser) {
    throw new AppError(400, 'Invalid request user id');
  }

  const whereCondition: Prisma.FriendshipWhereUniqueInput = {
    userId_requestId: {
      userId: user.id,
      requestId: requestUser.id,
    },
  };

  const existFriendshipRecord = await prisma.friendship.findUnique({
    where: whereCondition,
  });

  if (!existFriendshipRecord) {
    throw new AppError(404, 'Friendship record not found');
  }

  const result = await prisma.friendship.update({
    where: whereCondition,
    data: {
      isApproved: true,
      updatedAt: new Date().toISOString(),
    },
  });

  return result;
};

const deleteFriendOrFriendRequest = async (payload: {
  user: JwtPayload;
  userId: string;
}) => {
  const { user, userId } = payload;

  if (user.id === userId) {
    throw new AppError(400, "You can't delete own");
  }

  const friendOrRequest = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!friendOrRequest) {
    throw new AppError(400, 'Invalid user id');
  }

  const whereCondition: Prisma.FriendshipWhereUniqueInput = {
    userId_requestId: {
      userId: user.id,
      requestId: friendOrRequest.id,
    },
  };

  const existFriendshipRecord = await prisma.friendship.findUnique({
    where: whereCondition,
  });

  if (!existFriendshipRecord) {
    throw new AppError(404, 'Friendship record not found');
  }

  const result = await prisma.friendship.delete({
    where: whereCondition,
  });

  return result;
};

const deleteMySendRequest = async (payload: {
  user: JwtPayload;
  userId: string;
}) => {
  const { user, userId } = payload;

  if (user.id === userId) {
    throw new AppError(400, "You can't delete own");
  }

  const sendRequestUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!sendRequestUser) {
    throw new AppError(400, 'Invalid user id');
  }

  const whereCondition: Prisma.FriendshipWhereUniqueInput = {
    userId_requestId: {
      userId: sendRequestUser.id,
      requestId: user.id,
    },
  };

  const existFriendshipRecord = await prisma.friendship.findUnique({
    where: whereCondition,
  });

  if (!existFriendshipRecord) {
    throw new AppError(404, 'Friendship record not found');
  }

  const result = await prisma.friendship.delete({
    where: whereCondition,
  });

  return result;
};

const followORUunfollowUser = async (payload: {
  user: JwtPayload;
  userId: string;
}) => {
  const { user, userId } = payload;

  if (user.id === userId) {
    throw new AppError(400, "You can't follow own");
  }

  const followOrunfollowUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!followOrunfollowUser) {
    throw new AppError(400, 'Invalid user id');
  }

  const whereCondition: Prisma.FriendshipWhereUniqueInput = {
    userId_requestId: {
      userId: followOrunfollowUser.id,
      requestId: user.id,
    },
  };

  const existFriendshipRecord = await prisma.friendship.findUnique({
    where: whereCondition,
  });

  if (!existFriendshipRecord) {
    throw new AppError(404, 'Friendship record not found');
  }

  const result = await prisma.friendship.update({
    where: whereCondition,
    data: {
      following: existFriendshipRecord.following === true ? false : true,
    },
  });

  return result;
};

const friendshipServices = {
  getFriendships,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendOrFriendRequest,
  deleteMySendRequest,
  followORUunfollowUser,
};
export default friendshipServices;
