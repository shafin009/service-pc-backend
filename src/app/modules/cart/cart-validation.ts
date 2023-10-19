import { z } from 'zod';

const createCartValidation = z.object({
  body: z.object({
    userId: z.string({ required_error: 'UserId is required' }),
    serviceId: z.string({ required_error: 'ServiceId is required' }),
  }),
});

const updateCartValidation = z.object({
  body: z.object({
    userId: z.string().optional(),
    serviceId: z.string({ required_error: 'ServiceId is required' }).optional(),
  }),
});
export const cartValidation = {
  createCartValidation,
  updateCartValidation,
};
