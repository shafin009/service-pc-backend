/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../shared/prisma';

const getProfile = async (user: any) => {
  const { userId } = user;
  const result = await prisma.user.findUnique({ where: { id: userId } });
  return result;
};

export const profileService = {
  getProfile,
};
