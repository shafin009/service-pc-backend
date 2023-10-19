/* eslint-disable no-empty */
import { User, UserRole } from '@prisma/client';
import createBycryptPassword from '../../../helpers/createbcrypt';
import prisma from '../../../shared/prisma';

const getAllUsers = async (requesterRole: UserRole): Promise<User[]> => {
  let result: User[] = [];

  if (requesterRole === UserRole.super_admin) {
    result = await prisma.user.findMany({});
  } else if (requesterRole === UserRole.admin) {
    result = await prisma.user.findMany({
      where: {
        role: UserRole.user,
      },
    });
  } else if (requesterRole === UserRole.user) {
    result = [];
  }
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<User>,
): Promise<User | null> => {
  const { password, ...rest } = payload;
  let genarateBycryptPass;
  if (password) {
    genarateBycryptPass = await createBycryptPassword(password);
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: genarateBycryptPass
      ? { ...rest, password: genarateBycryptPass }
      : rest,
  });
  return result;
};

const deleteUser = async (id: string, requestRole: UserRole): Promise<User> => {
  const deletingUser = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      phone: true,
      address: true,
      userName: true,
      profileImage: true,
    },
  });
  if (!deletingUser) {
    throw new Error('User not found');
  }
  if (requestRole === UserRole.super_admin) {
  } else if (requestRole === UserRole.admin) {
    if (deletingUser.role === UserRole.user) {
    } else {
      throw new Error('An admin cannot delete an admin or super admin.');
    }
  } else {
    throw new Error(
      'Permission denied: You are not authorized to delete users.',
    );
  }
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      phone: true,
      address: true,
      userName: true,
      profileImage: true,
    },
  });

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
