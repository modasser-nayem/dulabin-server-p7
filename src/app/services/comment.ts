import { JwtPayload } from 'jsonwebtoken';
import { ICreateComment, IUpdateComment } from '../interfaces/comment';
import prisma from '../utils/prisma';
import AppError from '../errors/AppError';
import { Prisma } from '@prisma/client';

const createComment = async (payload: {
  user: JwtPayload;
  data: ICreateComment;
}) => {
  const { user, data } = payload;

  data.userId = user.id;

  if (!(await prisma.post.findUnique({ where: { id: data.postId } }))) {
    throw new AppError(404, 'Invalid post id!');
  }

  const result = await prisma.comment.create({
    data: data,
  });

  return result;
};

const updateComment = async (payload: {
  user: JwtPayload;
  commentId: string;
  data: IUpdateComment;
}) => {
  const { user, commentId, data } = payload;

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment) {
    throw new AppError(404, 'Invalid comment id!');
  }

  if (comment.userId !== user.id) {
    throw new AppError(403, 'Forbidden Access');
  }

  const result = await prisma.comment.update({
    where: { id: comment.id },
    data: data,
  });

  return result;
};

const updateCommentStatus = async (payload: {
  user: JwtPayload;
  commentId: string;
}) => {
  const { user, commentId } = payload;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      post: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!comment) {
    throw new AppError(404, 'Comment not found!');
  }

  if (comment.post.userId !== user.id) {
    throw new AppError(403, 'Forbidden Access');
  }

  const result = await prisma.comment.update({
    where: { id: comment.id },
    data: {
      status: comment.status === 'hide' ? 'unhide' : 'hide',
    },
  });

  return result;
};

const deleteComment = async (payload: {
  user: JwtPayload;
  commentId: string;
}) => {
  const { user, commentId } = payload;

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment) {
    throw new AppError(404, 'Invalid comment id!');
  }

  if (comment.userId !== user.id) {
    throw new AppError(403, 'Forbidden Access');
  }

  const result = await prisma.comment.delete({
    where: { id: comment.id },
  });

  return result;
};

const getAllCommentByPostId = async (payload: {
  user: JwtPayload;
  postId: string;
}) => {
  const { postId, user } = payload;

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new AppError(400, 'Invalid Post id!');
  }

  const whereCondition: Prisma.CommentWhereInput = { postId: post.id };
  if (post.userId !== user.id) {
    whereCondition.status = 'unhide';
  }

  const result = await prisma.comment.findMany({
    where: whereCondition,
    select: {
      id: true,
      content: true,
      createdAt: true,
      reactions: {
        select: {
          id: true,
          reaction: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              photoURL: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          photoURL: true,
        },
      },
    },
  });

  return result;
};

const commentServices = {
  createComment,
  updateComment,
  updateCommentStatus,
  deleteComment,
  getAllCommentByPostId,
};
export default commentServices;
