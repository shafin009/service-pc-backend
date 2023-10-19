"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = void 0;
const zod_1 = require("zod");
const createCartValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'UserId is required' }),
        serviceId: zod_1.z.string({ required_error: 'ServiceId is required' }),
    }),
});
const updateCartValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string({ required_error: 'ServiceId is required' }).optional(),
    }),
});
exports.cartValidation = {
    createCartValidation,
    updateCartValidation,
};
