import { bookingStatus } from '@prisma/client';
import { z } from 'zod';

const createBookingValidation = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'serviceId is required' }),
    address: z.string({ required_error: 'address is required' }),
    scheduleDate: z.string({ required_error: 'scheduleDate is required' }),
  }),
});
const updateBookingValidation = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'serviceId is required' }).optional(),
    address: z.string({ required_error: 'address is required' }).optional(),
    scheduleDate: z
      .string({ required_error: 'scheduleDate is required' })
      .optional(),
    adjustedSchedule: z
      .string({ required_error: 'adjustedSchedule is required' })
      .optional(),
    status: z
      .enum([...Object.values(bookingStatus)] as [string, ...string[]], {
        required_error: 'status is required',
      })
      .optional(),
  }),
});
export const bookingValidation = {
  createBookingValidation,
  updateBookingValidation,
};
