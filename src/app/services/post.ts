import { JwtPayload } from 'jsonwebtoken';
import { ICreatePost, IUpdatePost } from '../interfaces/post';

const createPost = async (user: JwtPayload, data: ICreatePost) => {
  const result = { user, data };

  return result;
};

const updatePost = async (
  user: JwtPayload,
  postId: string,
  data: IUpdatePost,
) => {
  const result = { user, postId, data };

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
