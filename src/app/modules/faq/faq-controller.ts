import {  FAQ } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { faqService } from './faq-service';

const createFaq: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const FaqData = req.body;

    const result = await faqService.createFaq(FaqData);
    sendResponse<FAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faq Created successfully!',
      data: result,
    });
  },
);

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.getAllFaq();

  sendResponse<FAQ[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq retrieved successfully !',
    data: result,
  });
});

const getSingleFaq: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await faqService.getSingleFaq(id);

    sendResponse<FAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faq retrieved  successfully!',
      data: result,
    });
  },
);

const updateFaq: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await faqService.updateFaq(id, payload);

    sendResponse<FAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faq Updated successfully!',
      data: result,
    });
  },
);
const deleteFaq: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await faqService.deleteFaq(id);

    sendResponse<FAQ>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faq deleted successfully!',
      data: result,
    });
  },
);

export const faqController = {
  getAllFaq,
  createFaq,
  updateFaq,
  getSingleFaq,
  deleteFaq,
};
