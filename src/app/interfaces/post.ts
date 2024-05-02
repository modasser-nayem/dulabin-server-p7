export interface ICreatePost {
  userId: string;
  text?: string;
  mediaURL?: string[];
  privacy?: string;
}

export interface IUpdatePost {
  text?: string;
  mediaURL?: string[];
  privacy?: string;
}
