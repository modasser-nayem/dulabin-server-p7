import { z } from 'zod';

const createPost = z.object({
  body: z.object({
    text: z
      .string()
      .optional()
      .refine((value) => value !== '', { message: 'Text is required' }),
    privacy: z.enum(['public', 'friends', 'private']).optional(),
    mediaURL: z.array(z.string()).optional(),
  }),
});

const updatePost = z.object({
  body: z.object({
    text: z
      .string()
      .optional()
      .refine((value) => value !== '', { message: 'Text is required' }),
    privacy: z.enum(['public', 'friends', 'private']).optional(),
    mediaURL: z.array(z.string()).optional(),
  }),
});

const postSchemasValidation = { createPost, updatePost };
export default postSchemasValidation;
