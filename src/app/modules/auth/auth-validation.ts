import { UserRole } from '@prisma/client';
import { z } from 'zod';

const createSignupZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    name: z.string({ required_error: 'Name is required' }),
    phone: z.string({ required_error: 'Phone is required' }).max(11),
    address: z.string({ required_error: 'Address is required' }),
    userName: z
      .string({ required_error: 'username is required & minimum 7 character' })
      .min(7),
    profileImage: z.string().optional(),
    role: z
      .enum([...Object.values(UserRole)] as [string, ...string[]], {})
      .optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  createSignupZodSchema,
  refreshTokenZodSchema,
  loginZodSchema,
};
