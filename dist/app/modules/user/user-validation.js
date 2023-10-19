"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }).optional(),
        email: zod_1.z.string({ required_error: 'email is required' }).optional(),
        phone: zod_1.z.string({ required_error: 'phone is required' }).optional(),
        address: zod_1.z.string({ required_error: 'address is required' }).optional(),
        profileImage: zod_1.z
            .string({ required_error: 'profileImage is required' })
            .optional(),
        password: zod_1.z.string({ required_error: 'password is required' }).optional(),
        role: zod_1.z
            .enum([...Object.values(client_1.UserRole)], {})
            .optional(),
    }),
});
exports.userValidation = {
    updateUserValidation,
};
