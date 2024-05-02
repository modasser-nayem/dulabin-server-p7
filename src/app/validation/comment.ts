import { z } from 'zod';

const createComment = z.object({
  body: z.object({
    content: z
      .string({ required_error: 'content is required' })
      .refine((value) => value !== '', { message: 'content is required' }),
    postId: z
      .string({ required_error: 'postId is required' })
      .refine((value) => value !== '', { message: 'postId is required' }),
  }),
});

const updateComment = z.object({
  body: z.object({
    content: z
      .string({ required_error: 'content is required' })
      .refine((value) => value !== '', { message: 'content is required' }),
  }),
});

const commentSchemasValidation = {
  createComment,
  updateComment,
};
export default commentSchemasValidation;
