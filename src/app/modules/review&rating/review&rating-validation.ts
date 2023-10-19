import { z } from 'zod';

const createReviewAndRatingValidation = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'serviceId is required' }),
    rating: z.number({ required_error: 'rating is required' }).min(1).max(5),
    review: z.string({ required_error: 'review is required' }),
  }),
});

const updateReviewAndRatingValidation = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'serviceId is required' }).optional(),
    rating: z
      .number({ required_error: 'rating is required' })
      .min(1)
      .max(5)
      .optional(),
    review: z.string({ required_error: 'review is required' }).optional(),
  }),
});
export const reviewAndRatingValidation = {
  createReviewAndRatingValidation,
  updateReviewAndRatingValidation,
};
