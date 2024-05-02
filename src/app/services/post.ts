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
  const result = user;

  return result;
};

const getAllPost = async () => {
  const result = 'get all post';

  return result;
};

const getSinglePost = async (postId: string) => {
  const result = postId;

  return result;
};

const deletePost = async (user: JwtPayload, postId: string) => {
  const result = { user, postId };

  return result;
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
