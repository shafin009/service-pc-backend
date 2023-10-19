import { Cart } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { serviceCheaker } from '../../../helpers/serviceCheaker';
import prisma from '../../../shared/prisma';


const getAllCart = async (): Promise<Cart[]> => {
  const result = await prisma.cart.findMany({ where: {} });
  return result;
};
const createCart = async (payload: Cart): Promise<Cart | null> => {
  await serviceCheaker(payload.userId, payload.serviceId);
  const newCart = await prisma.cart.create({
    data: payload,
  });
  return newCart;
};

const getSingleCart = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const getSingleUserAllCart = async (userId: string): Promise<Cart[] | null> => {
  const result = await prisma.cart.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

const updateCart = async (
  id: string,
  payload: Partial<Cart>,
): Promise<Cart | null> => {
  const result = await prisma.cart.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCart = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found!');
  }
  return result;
};

export const cartService = {
  getAllCart,
  createCart,
  updateCart,
  getSingleCart,
  deleteCart,
  getSingleUserAllCart,
};
