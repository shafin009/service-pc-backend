import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { cartController } from './cart-controller';
import { cartValidation } from './cart-validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  cartController.getAllCart,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  cartController.getSingleCart,
);
router.get(
  '/singleUserAllCart/:userId',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  cartController.getSingleUserAllCart,
);

router.post(
  '/create-cart',
  validateRequest(cartValidation.createCartValidation),
  auth(ENUM_USER_ROLE.USER),
  cartController.createCart,
);

router.patch(
  '/:id',
  validateRequest(cartValidation.updateCartValidation),
  auth(ENUM_USER_ROLE.USER),
  cartController.updateCart,
);
router.delete('/:id', auth(ENUM_USER_ROLE.USER), cartController.deleteCart);

export const cartRoutes = router;
