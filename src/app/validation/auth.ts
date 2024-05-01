import { z } from 'zod';

function isValidUsername(username: string): boolean {
  const usernameRegex = /^[^\s]+$/;
  return usernameRegex.test(username);
}

const registerUser = z.object({
  body: z
    .object({
      username: z
        .string({ required_error: 'username is required' })
        .refine((value) => value !== '', { message: 'Username is required' })
        .refine((value) => isValidUsername(value), {
          message: 'username must be without space',
        }),
      name: z
        .string({ required_error: 'name is required' })
        .refine((value) => value !== '', { message: 'Name is required' }),
      email: z
        .string({ required_error: 'email is required' })
        .email({ message: 'Invalid email address' }),
      password: z
        .string({ required_error: 'password is required' })
        .min(6, { message: 'Password must be 6 character' }),
      confirmPassword: z
        .string({
          required_error: 'confirmPassword is required',
        })
        .refine((value) => value !== '', {
          message: 'Confirm password is required',
        }),
      bio: z
        .string()
        .optional()
        .refine((value) => value !== '', {
          message: 'Bio is not empty',
        }),
      photoURL: z
        .string()
        .optional()
        .refine((value) => value !== '', {
          message: 'photoURL not empty',
        }),
      dateOfBirth: z
        .string()
        .optional()
        .refine((value) => value !== '', {
          message: 'date of birth is not empty',
        }),
      address: z
        .string()
        .optional()
        .refine((value) => value !== '', {
          message: 'address is not empty',
        }),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: "Confirm Password does't match",
    }),
});

const loginUser = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'username is required' })
      .refine((value) => value !== '', { message: 'Username is required' })
      .refine((value) => isValidUsername(value), {
        message: 'username must be without space',
      }),
    password: z
      .string({ required_error: 'password is required' })
      .refine((value) => value !== '', { message: 'password is required' }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refresh_token: z
      .string({ required_error: 'refresh_token is required in cookies' })
      .refine((value) => value !== '', {
        message: 'refresh_token is required in cookies',
      }),
  }),
});

const changePassword = z.object({
  body: z
    .object({
      currentPassword: z
        .string({ required_error: 'currentPassword is required' })
        .refine((value) => value !== '', {
          message: 'Current password is required',
        }),
      newPassword: z
        .string({ required_error: 'newPassword is required' })
        .min(6, { message: 'New Password must be 6 character' }),
      confirmPassword: z
        .string({
          required_error: 'confirmPassword is required',
        })
        .refine((value) => value !== '', {
          message: 'Confirm password is required',
        }),
    })
    .refine((value) => value.newPassword === value.confirmPassword, {
      message: "Confirm Password does't match",
    }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'email is required!' })
      .email({ message: 'Invalid email address' })
      .refine((value) => value !== '', { message: 'Email is required!' }),
  }),
});

const resetPassword = z.object({
  body: z
    .object({
      token: z
        .string({ required_error: 'token is required' })
        .refine((value) => value !== '', {
          message: 'token is required',
        }),
      newPassword: z
        .string({ required_error: 'newPassword is required' })
        .min(6, { message: 'New Password must be 6 character' }),
      confirmPassword: z
        .string({
          required_error: 'confirmPassword is required',
        })
        .refine((value) => value !== '', {
          message: 'Confirm password is required',
        }),
    })
    .refine((value) => value.newPassword === value.confirmPassword, {
      message: "Confirm Password does't match",
    }),
});

const authSchemasValidation = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
export default authSchemasValidation;
