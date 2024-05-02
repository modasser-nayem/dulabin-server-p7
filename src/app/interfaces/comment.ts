import { CommentStatus } from '@prisma/client';

export interface ICreateComment {
  userId: string;
  postId: string;
  content: string;
}

export interface IUpdateComment {
  content: string;
}

export interface IUpdateCommentStatus {
  status: CommentStatus;
}
