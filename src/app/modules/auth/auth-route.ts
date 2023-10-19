import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth-controller';
import { AuthValidation } from './auth-validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.createSignupZodSchema),
  AuthController.insertIntoDB,
);

router.post(
  '/signin',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

export const authRoutes = router;
