export interface IRegisterUser {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio?: string;
  photoURL?: string;
  dateOfBirth?: Date;
  address?: string;
}

export interface ILoginUser {
  username?: string;
  email?: string;
  password: string;
}

export type TForgetPassword = {
  email: string;
};
