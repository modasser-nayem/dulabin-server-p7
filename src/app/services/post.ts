import { JwtPayload } from 'jsonwebtoken';
import { ICreatePost, IUpdatePost } from '../interfaces/post';
import AppError from '../errors/AppError';
import prisma from '../utils/prisma';

const createPost = async (user: JwtPayload, data: ICreatePost) => {
  if (!data.text && !data.mediaURL?.length) {
    throw new AppError(400, 'Please provide any content text or media');
  }
  data.userId = user.id;

  const result = await prisma.post.create({
    data: data,
  });

  return result;
};

const updatePost = async (
  user: JwtPayload,
  postId: string,
  data: IUpdatePost,
) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new AppError(404, 'Post is not found!');
  }

  if (post.userId !== user.id) {
    throw new AppError(403, 'Forbidden Access');
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: data,
  });

  return result;
};

const getAllMyPost = async (user: JwtPayload) => {
  const result = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      text: true,
      mediaURL: true,
      privacy: true,
      createdAt: true,
      updatedAt: true,
      _count: true,
    },
  });

  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany({
    select: {
      id: true,
      text: true,
      mediaURL: true,
      privacy: true,
      createdAt: true,
      _count: true,
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

const getSinglePost = async (postId: string) => {
  const result = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      text: true,
      mediaURL: true,
      privacy: true,
      createdAt: true,
      comments: {
        select: {
          id: true,
          content: true,
          reactions: true,
          createdAt: true,
          _count: true,
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
      reactions: {},
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

  if (!result) {
    throw new AppError(404, 'Post not found!');
  }

  return result;
};

const deletePost = async (user: JwtPayload, postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new AppError(404, 'Post is not found!');
  }

  if (post.userId !== user.id) {
    throw new AppError(403, 'Forbidden Access');
  }

  await prisma.$transaction(async (trans) => {
    await trans.post.delete({ where: { id: post.id } });
    await trans.comment.deleteMany({ where: { postId: post.id } });
    await trans.reaction.deleteMany({ where: { postId: post.id } });
  });

  return null;
};

const postServices = {
  createPost,
  updatePost,
  getAllMyPost,
  getAllPost,
  getSinglePost,
  deletePost,
};
export default postServices;
