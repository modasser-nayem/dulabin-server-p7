import { z } from 'zod';

function isValidUsername(username: string): boolean {
  const usernameRegex = /^[^\s]+$/;
  return usernameRegex.test(username);
}

const updateUserProfile = z.object({
  body: z.object({
    username: z
      .string()
      .refine((value) => value !== '', { message: 'Username is required' })
      .refine((value) => isValidUsername(value), {
        message: 'username must be without space',
      })
      .optional(),
    name: z
      .string()
      .refine((value) => value !== '', { message: 'Name is required' })
      .optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    bio: z
      .string()
      .refine((value) => value !== '', {
        message: 'Bio is not empty',
      })
      .optional(),
    photoURL: z
      .string()
      .refine((value) => value !== '', {
        message: 'photoURL not empty',
      })
      .optional(),
    dateOfBirth: z
      .string()
      .refine((value) => value !== '', {
        message: 'date of birth is not empty',
      })
      .optional(),
    address: z
      .string()
      .refine((value) => value !== '', {
        message: 'address is not empty',
      })
      .optional(),
  }),
});

const userSchemasValidation = { updateUserProfile };
export default userSchemasValidation;
