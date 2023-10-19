import { availabilityOption } from '@prisma/client';
import { z } from 'zod';

const createServiceValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    description: z.string({ required_error: 'description is required' }),
    image: z.string({ required_error: 'image is required' }),
    location: z.string({ required_error: 'location is required' }),
    price: z.number({ required_error: 'price is required' }),
    categoryId: z.string({ required_error: 'categoryId is required' }),
    availability: z.enum(
      [...Object.values(availabilityOption)] as [string, ...string[]],
      {},
    ),
  }),
});

const updateServiceValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    image: z.string({ required_error: 'image is required' }).optional(),
    location: z.string({ required_error: 'location is required' }).optional(),
    price: z.number({ required_error: 'price is required' }).optional(),
    categoryId: z
      .string({ required_error: 'categoryId is required' })
      .optional(),
    availability: z
      .enum([...Object.values(availabilityOption)] as [string, ...string[]], {})
      .optional(),
  }),
});

export const serviceValidation = {
  createServiceValidation,
  updateServiceValidation,
};
