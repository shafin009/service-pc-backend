import { z } from 'zod';

const createFeedbackValidation = z.object({
  body: z.object({
    comment: z.string({ required_error: 'comment is required' }),
  }),
});


const updateFeedbackValidation = z.object({
  body: z.object({
    comment: z.string({ required_error: 'comment is required' }),
  }),
});

export const feedbackValidation = {
  createFeedbackValidation,
  updateFeedbackValidation,
};
