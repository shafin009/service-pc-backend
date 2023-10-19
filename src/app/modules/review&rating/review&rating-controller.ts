import { ReviewAndRating } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { reviewAndRatingService } from './review&rating-service';

const createReviewAndRating: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const reviewAndRatingData = req.body;
    const user = req.user;
    const result = await reviewAndRatingService.createReviewAndRating({
      ...reviewAndRatingData,
      userId: user?.userId,
    });
    sendResponse<ReviewAndRating>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Created successfully!',
      data: result,
    });
  },
);

const getAllReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const result = await reviewAndRatingService.getAllReviewAndRating();

    sendResponse<ReviewAndRating[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved successfully !',
      data: result,
    });
  },
);

const getSingleReviewAndRating: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await reviewAndRatingService.getSingleReviewAndRating(id);

    sendResponse<ReviewAndRating>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved  successfully!',
      data: result,
    });
  },
);

const updateReviewAndRating: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await reviewAndRatingService.updateReviewAndRating(
      id,
      updateAbleData,
    );

    sendResponse<ReviewAndRating>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Updated successfully!',
      data: result,
    });
  },
);
const deleteReviewAndRating: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await reviewAndRatingService.deleteReviewAndRating(id);

    sendResponse<ReviewAndRating>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully!',
      data: result,
    });
  },
);

export const reviewAndRating = {
  getAllReviewAndRating,
  createReviewAndRating,
  updateReviewAndRating,
  getSingleReviewAndRating,
  deleteReviewAndRating,
};
