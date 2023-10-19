/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service-constant';

const createService = async (serviceData: Service): Promise<Service> => {
  console.log(serviceData);
  const service = await prisma.service.create({
    data: serviceData,
    include: {
      category: true,
    },
  });
  return service;
};

const getAllService = async (filters: any, paginationOptions: any) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    if (filterData.category) {
      andConditions.push({
        categoryId: filterData.category,
      });
    }
  }

  if (minPrice) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            name: 'desc',
          },
  });

  const total = await prisma.service.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
};

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: { category: true },
  });

  return result;
};

const updateService = async (id: string, payload: any) => {
  delete payload.categoryId;
  delete payload.category;
  const result = await prisma.service.update({
    include: { category: true },
    where: { id },
    data: {
      ...payload,
    },
  });
  return result;
};

const deleteService = async (id: string): Promise<Service> => {
  try {
    const service = await prisma.service.delete({
      where: {
        id,
      },
    });
    return service;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new Error('The service to delete does not exist.');
    }
    throw error;
  }
};

export const myServices = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
