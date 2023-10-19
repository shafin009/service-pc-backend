"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
        image: zod_1.z.string({ required_error: 'image is required' }),
        location: zod_1.z.string({ required_error: 'location is required' }),
        price: zod_1.z.number({ required_error: 'price is required' }),
        categoryId: zod_1.z.string({ required_error: 'categoryId is required' }),
        availability: zod_1.z.enum([...Object.values(client_1.availabilityOption)], {}),
    }),
});
const updateServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }).optional(),
        description: zod_1.z
            .string({ required_error: 'description is required' })
            .optional(),
        image: zod_1.z.string({ required_error: 'image is required' }).optional(),
        location: zod_1.z.string({ required_error: 'location is required' }).optional(),
        price: zod_1.z.number({ required_error: 'price is required' }).optional(),
        categoryId: zod_1.z
            .string({ required_error: 'categoryId is required' })
            .optional(),
        availability: zod_1.z
            .enum([...Object.values(client_1.availabilityOption)], {})
            .optional(),
    }),
});
exports.serviceValidation = {
    createServiceValidation,
    updateServiceValidation,
};
