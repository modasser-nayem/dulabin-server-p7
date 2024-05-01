export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  photoURL?: string;
  dateOfBirth?: Date;
  lastLoginAt?: Date;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateMyProfile {
  username?: string;
  name?: string;
  email?: string;
  bio?: string;
  photoURL?: string;
  dateOfBirth?: Date;
  address?: string;
}
