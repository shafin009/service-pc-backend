import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { blogService } from './blog-service';

const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const BlogData = req.body;

    const result = await blogService.createBlog(BlogData);
    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Created successfully!',
      data: result,
    });
  },
);
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllBlog();

  sendResponse<Blog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully !',
    data: result,
  });
});

const getSingleBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await blogService.getSingleBlog(id);

    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog retrieved  successfully!',
      data: result,
    });
  },
);

const updateBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await blogService.updateBlog(id, payload);

    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Updated successfully!',
      data: result,
    });
  },
);
const deleteBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await blogService.deleteBlog(id);

    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog deleted successfully!',
      data: result,
    });
  },
);

export const blogController = {
  getSingleBlog,
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
