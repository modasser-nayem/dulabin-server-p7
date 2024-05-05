import { JwtPayload } from 'jsonwebtoken';
import { IReaction } from '../interfaces/reaction';
import prisma from '../utils/prisma';
import AppError from '../errors/AppError';

const reactionPostOrComment = async (payload: {
  user: JwtPayload;
  data: IReaction;
}) => {
  const { user, data } = payload;

  data.userId = user.id;

  const existReaction = await prisma.reaction.findFirst({
    where: {
      AND: {
        userId: user.id,
        OR: [{ postId: data.postId }, { commentId: data.commentId }],
      },
    },
  });

  if (existReaction) {
    await prisma.reaction.update({
      where: { id: existReaction.id },
      data: { reaction: data.reaction },
    });
  } else {
    await prisma.reaction.create({
      data: data,
    });
  }

  return null;
};

const deleteReaction = async (payload: {
  user: JwtPayload;
  reactionId: string;
}) => {
  const { user, reactionId } = payload;
  const existReaction = await prisma.reaction.findUnique({
    where: { id: reactionId },
  });

  if (!existReaction) {
    throw new AppError(400, 'Invalid reaction id');
  }

  if (existReaction.userId !== user.id) {
    throw new AppError(403, 'Forbidden Access');
  }

  const result = await prisma.reaction.delete({
    where: {
      id: reactionId,
    },
  });

  return result;
};

const getReactionByPostId = async (payload: { postId: string }) => {
  const { postId } = payload;

  const existPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!existPost) {
    throw new AppError(404, 'Post not found');
  }

  const result = await prisma.reaction.findMany({
    where: {
      postId: postId,
    },
  });

  return result;
};

const getReactionByCommentId = async (payload: { commentId: string }) => {
  const { commentId } = payload;

  const existComment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!existComment) {
    throw new AppError(404, 'Comment not found');
  }

  const result = await prisma.reaction.findMany({
    where: {
      commentId: commentId,
    },
  });

  return result;
};

const reactionServices = {
  reactionPostOrComment,
  deleteReaction,
  getReactionByPostId,
  getReactionByCommentId,
};
export default reactionServices;
