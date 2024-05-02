export interface ICreateComment {
  userId: string;
  postId: string;
  content: string;
}

export interface IUpdateComment {
  content: string;
}
