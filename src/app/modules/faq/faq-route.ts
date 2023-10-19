import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { faqController } from './faq-controller';
import { faqValidation } from './faq-validation';

const router = express.Router();

router.post(
  '/create-faq',
  validateRequest(faqValidation.createFAQValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),

  faqController.createFaq,
);

router.get('/', faqController.getAllFaq);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  faqController.getSingleFaq,
);

router.patch(
  '/:id',
  validateRequest(faqValidation.updateFAQValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  faqController.updateFaq,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  faqController.deleteFaq,
);

export const faqRoutes = router;
