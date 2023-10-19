import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogController } from './blog-controller';
import { blogValidation } from './blog-validation';

const router = express.Router();

router.get('/', blogController.getAllBlog);
router.get('/:id', blogController.getSingleBlog);

router.post(
  '/create-blog',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(blogValidation.createBlogValidation),
  blogController.createBlog,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(blogValidation.updateBlogValidation),
  blogController.updateBlog,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  blogController.deleteBlog,
);

export const blogRoutes = router;
