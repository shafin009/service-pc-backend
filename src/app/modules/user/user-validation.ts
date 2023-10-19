import { UserRole } from '@prisma/client';
import { z } from 'zod';

const updateUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    email: z.string({ required_error: 'email is required' }).optional(),
    phone: z.string({ required_error: 'phone is required' }).optional(),
    address: z.string({ required_error: 'address is required' }).optional(),
    profileImage: z
      .string({ required_error: 'profileImage is required' })
      .optional(),
    password: z.string({ required_error: 'password is required' }).optional(),
    role: z
      .enum([...Object.values(UserRole)] as [string, ...string[]], {})
      .optional(),
  }),
});

export const userValidation = {
  updateUserValidation,
};
