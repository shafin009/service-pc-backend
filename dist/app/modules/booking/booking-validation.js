"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }),
        address: zod_1.z.string({ required_error: 'address is required' }),
        scheduleDate: zod_1.z.string({ required_error: 'scheduleDate is required' }),
    }),
});
const updateBookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }).optional(),
        address: zod_1.z.string({ required_error: 'address is required' }).optional(),
        scheduleDate: zod_1.z
            .string({ required_error: 'scheduleDate is required' })
            .optional(),
        adjustedSchedule: zod_1.z
            .string({ required_error: 'adjustedSchedule is required' })
            .optional(),
        status: zod_1.z
            .enum([...Object.values(client_1.bookingStatus)], {
            required_error: 'status is required',
        })
            .optional(),
    }),
});
exports.bookingValidation = {
    createBookingValidation,
    updateBookingValidation,
};
