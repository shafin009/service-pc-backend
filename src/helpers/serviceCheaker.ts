import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import prisma from '../shared/prisma';

export const serviceCheaker = async (userId: string, serviceId: string) => {
  console.log({ userId, serviceId });
  if (!serviceId || !userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'userId or serviceId not found');
  }
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });
  const isServiceExist = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!isServiceExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service not found');
  }
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
