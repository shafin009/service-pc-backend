"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createSignupZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        name: zod_1.z.string({ required_error: 'Name is required' }),
        phone: zod_1.z.string({ required_error: 'Phone is required' }).max(11),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        userName: zod_1.z
            .string({ required_error: 'username is required & minimum 7 character' })
            .min(7),
        profileImage: zod_1.z.string().optional(),
        role: zod_1.z
            .enum([...Object.values(client_1.UserRole)], {})
            .optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    createSignupZodSchema,
    refreshTokenZodSchema,
    loginZodSchema,
};
