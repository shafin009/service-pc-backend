import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterAbleFields } from './booking-constants';
import { BookingService } from './booking-service';

const createBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookingData = req.body;
    const user = req.user;
    const result = await BookingService.createBooking({
      ...bookingData,
      userId: user?.userId,
    });
    sendResponse<Booking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking Created successfully!',
      data: result,
    });
  },
);

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...bookingFilterAbleFields]);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookingService.getAllBooking(filters, paginationOptions);

  sendResponse<Booking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BookingService.getSingleBooking(id);

    sendResponse<Booking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved  successfully!',
      data: result,
    });
  },
);
const getSingleUserAllBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const result = await BookingService.getSingleUserAllBooking(userId);

    sendResponse<Booking[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully!',
      data: result,
    });
  },
);

const updateBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const requestRole = req?.user?.role;

    const result = await BookingService.updateBooking(id, payload, requestRole);
    sendResponse<Booking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking Updated successfully!',
      data: result,
    });
  },
);

const deleteBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const requestRole = req?.user?.role;

    const result = await BookingService.deleteBooking(id, requestRole);

    sendResponse<Booking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking deleted successfully!',
      data: result,
    });
  },
);

export const bookingController = {
  getAllBooking,
  createBooking,
  updateBooking,
  getSingleBooking,
  deleteBooking,
  getSingleUserAllBooking,
};
