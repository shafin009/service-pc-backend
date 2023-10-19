/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking,Prisma,UserRole,bookingStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { serviceCheaker } from '../../../helpers/serviceCheaker';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBookingFilters,bookingSearchableFields } from './booking-constants';

const getAllBooking = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<Booking[]>> => {
  const { page, size, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    const searchAbleFields = bookingSearchableFields.map(single => {
      const query = {
        [single]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      };
      return query;
    });
    andCondition.push({
      OR: searchAbleFields,
    });
  }
  if (Object.keys(filters).length) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.booking.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.booking.count();
  const output = {
    data: result,
    meta: { page, limit: size, total },
  };
  return output;
};

const createBooking = async (payload: Booking): Promise<Booking | null> => {
  
  const minimumScheduleDate = new Date();
  minimumScheduleDate.setHours(minimumScheduleDate.getHours() + 3);

  if (payload.scheduleDate <= minimumScheduleDate) {
    throw new Error('Schedule date must be at least 3 hours from now.');
  }

  
  const existingBooking = await prisma.booking.findFirst({
    where: {
      scheduleDate: payload.scheduleDate,
    },
  });

  if (existingBooking) {
    throw new Error(
      'Another booking already exists at the same schedule date.',
    );
  }

  await serviceCheaker(payload.userId, payload.serviceId);
  const newBooking = await prisma.booking.create({
    data: payload,
  });

  return newBooking;
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  if (!result?.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data Not found');
  }
  return result;
};
const getSingleUserAllBooking = async (
  userId: string,
): Promise<Booking[] | null> => {
  const result = await prisma.booking.findMany({
    where: {
      userId,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<Booking>,
  requestRole: UserRole,
): Promise<Booking | null> => {
  if (requestRole !== UserRole.admin && requestRole !== UserRole.super_admin) {
    throw new Error(
      'Permission denied: You are not authorized to change the booking status.',
    );
  }
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBooking = async (
  id: string,
  requestRole: UserRole,
): Promise<Booking | null> => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found!');
  }

  if (booking.status === bookingStatus.accepted) {
    if (
      requestRole !== UserRole.admin &&
      requestRole !== UserRole.super_admin
    ) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Cannot delete an accepted booking.',
      );
    }
  }

  const result = await prisma.booking.delete({
    where: { id },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found!');
  }

  return result;
};

export const BookingService = {
  getAllBooking,
  createBooking,
  updateBooking,
  getSingleBooking,
  getSingleUserAllBooking,
  deleteBooking,
};
