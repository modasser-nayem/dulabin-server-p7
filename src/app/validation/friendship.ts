import { z } from 'zod';

const friendship = z.object({
  body: z.object({
    userId: z
      .string({ required_error: 'userId is required!' })
      .refine((value) => value !== '', { message: 'User Id is required' }),
  }),
});

const friendshipSchemasValidation = { friendship };
export default friendshipSchemasValidation;
