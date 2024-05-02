import { JwtPayload } from 'jsonwebtoken';
import {
  ICreateComment,
  IUpdateComment,
  IUpdateCommentStatus,
} from '../interfaces/comment';

const createComment = async (payload: {
  user: JwtPayload;
  data: ICreateComment;
}) => {
  return payload;
};

const updateComment = async (payload: {
  user: JwtPayload;
  commentId: string;
  data: IUpdateComment;
}) => {
  return payload;
};

const updateCommentStatus = async (payload: {
  user: JwtPayload;
  commentId: string;
  data: IUpdateCommentStatus;
}) => {
  return payload;
};

const deleteComment = async (payload: {
  user: JwtPayload;
  commentId: string;
}) => {
  return payload;
};

const getAllCommentByPostId = async (payload: { postId: string }) => {
  return payload;
};

const commentServices = {
  createComment,
  updateComment,
  updateCommentStatus,
  deleteComment,
  getAllCommentByPostId,
};
export default commentServices;
