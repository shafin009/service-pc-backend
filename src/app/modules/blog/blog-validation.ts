import { z } from 'zod';

const createBlogValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    body: z.string({ required_error: 'Body is required' }),
  }),
});

const updateBlogValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    body: z.string({ required_error: 'Body is required' }).optional(),
  }),
});

export const blogValidation = {
  createBlogValidation,
  updateBlogValidation,
};
