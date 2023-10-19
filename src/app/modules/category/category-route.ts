import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category-controller';
import { categoryValidation } from './category-validation';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(categoryValidation.createCategoryValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  categoryController.createCategory,
);

router.get('/', categoryController.getAllCategory);

router.get('/:id', categoryController.getSingleCategory);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(categoryValidation.updateCategoryValidation),
  categoryController.updateCategory,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  categoryController.deleteCategory,
);

export const categoryRoutes = router;
