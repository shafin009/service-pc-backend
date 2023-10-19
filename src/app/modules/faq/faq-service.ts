import {  FAQ } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllFaq = async (): Promise<FAQ[]> => {
  const result = await prisma.fAQ.findMany({});
  return result;
};

const createFaq = async (payload: FAQ): Promise<FAQ | null> => {
  const newFaq = await prisma.fAQ.create({
    data: payload,
  });
  return newFaq;
};

const getSingleFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateFaq = async (
  id: string,
  payload: Partial<FAQ>,
): Promise<FAQ | null> => {
  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found!');
  }
  return result;
};

export const faqService = {
  getAllFaq,
  createFaq,
  updateFaq,
  getSingleFaq,
  deleteFaq,
};
