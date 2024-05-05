import { z } from 'zod';

const reactionPostOrComment = z.object({
  body: z
    .object({
      postId: z
        .string()
        .refine((value) => value !== '', { message: 'Post id is required' })
        .optional(),
      commentId: z
        .string()
        .refine((value) => value !== '', { message: 'Comment id is required' })
        .optional(),
      reaction: z.enum(['like', 'dislike']),
    })
    .refine(
      (value) => {
        if (!value.postId && !value.commentId) {
          return false;
        } else {
          return true;
        }
      },
      { message: 'Post id or Comment id required' },
    ),
});

const reactionSchemasValidation = { reactionPostOrComment };
export default reactionSchemasValidation;
