import { ReactOption } from '@prisma/client';

export interface IReaction {
  postId?: string;
  commentId?: string;
  userId: string;
  reaction: ReactOption;
}
