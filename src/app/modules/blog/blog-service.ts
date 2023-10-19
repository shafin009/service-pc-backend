import { Blog } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllBlog = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany({});
  return result;
};

const createBlog = async (payload: Blog): Promise<Blog | null> => {
  const newBlog = await prisma.blog.create({
    data: payload,
  });
  return newBlog;
};

const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<Blog>,
): Promise<Blog | null> => {
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found!');
  }
  return result;
};

export const blogService = {
  getSingleBlog,
  deleteBlog,
  getAllBlog,
  createBlog,
  updateBlog,
};
