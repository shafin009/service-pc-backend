import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service-controller';
import { serviceValidation } from './service-validation';
const router = express.Router();

router.post(
  '/create-service',
  validateRequest(serviceValidation.createServiceValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.createService,
);

router.get('/', ServiceController.getAllService);

router.get('/:id', ServiceController.getSingleService);

router.patch(
  '/:id',
  validateRequest(serviceValidation.updateServiceValidation),

  ServiceController.updateService,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService,
);

export const serviceRoutes = router;
