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
  username: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type IForgetPassword = {
  email: string;
};

export type IResetPassword = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
