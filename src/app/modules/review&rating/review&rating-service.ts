
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ReviewAndRating } from '@prisma/client';
import { serviceCheaker } from '../../../helpers/serviceCheaker';

const getAllReviewAndRating = async (): Promise<ReviewAndRating[]> => {
  const result = await prisma.reviewAndRating.findMany({});
  return result;
};

const createReviewAndRating = async (
  payload: ReviewAndRating,
): Promise<ReviewAndRating | null> => {
  await serviceCheaker(payload.userId, payload.serviceId);
  const newReview = await prisma.reviewAndRating.create({
    data: payload,
  });
  return newReview;
};

const getSingleReviewAndRating = async (
  id: string,
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateReviewAndRating = async (
  id: string,
  payload: Partial<ReviewAndRating>,
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteReviewAndRating = async (
  id: string,
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

export const reviewAndRatingService = {
  getAllReviewAndRating,
  createReviewAndRating,
  updateReviewAndRating,
  getSingleReviewAndRating,
  deleteReviewAndRating,
};
