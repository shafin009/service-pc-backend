import { Cart } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { cartService } from './cart-service';

const createCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const CartData = req.body;
    const user = req.user;
    const result = await cartService.createCart({
      ...CartData,
      userId: user?.userId,
    });
    sendResponse<Cart>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart Created successfully!',
      data: result,
    });
  },
);

const getAllCart = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.getAllCart();

  sendResponse<Cart[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully !',
    data: result,
  });
});

const getSingleCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await cartService.getSingleCart(id);

    sendResponse<Cart>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart retrieved  successfully!',
      data: result,
    });
  },
);
const getSingleUserAllCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const result = await cartService.getSingleUserAllCart(userId);

    sendResponse<Cart[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart retrieved  successfully!',
      data: result,
    });
  },
);

const updateCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await cartService.updateCart(id, updateAbleData);

    sendResponse<Cart>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart Updated successfully!',
      data: result,
    });
  },
);
const deleteCart: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await cartService.deleteCart(id);

    sendResponse<Cart>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart deleted successfully!',
      data: result,
    });
  },
);

export const cartController = {
  getAllCart,
  createCart,
  updateCart,
  getSingleCart,
  deleteCart,
  getSingleUserAllCart,
};
