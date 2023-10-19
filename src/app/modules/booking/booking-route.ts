import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingController } from './booking-controller';
import { bookingValidation } from './booking-validation';

const router = express.Router();

router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(bookingValidation.createBookingValidation),
  bookingController.createBooking,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  bookingController.getAllBooking,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  bookingController.getSingleBooking,
);
router.get(
  '/singleUserAllBooking/:userId',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  bookingController.getSingleUserAllBooking,
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(bookingValidation.updateBookingValidation),
  bookingController.updateBooking,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  bookingController.deleteBooking,
);

export const bookingRoutes = router;
