import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { feedbackController } from './feedback-controller';
import { feedbackValidation } from './feedback-validation';

const router = express.Router();

router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getSingleFeedback);

router.post(
  '/create-feedback',
  validateRequest(feedbackValidation.createFeedbackValidation),
  feedbackController.createFeedback,
);

router.patch(
  '/:id',
  validateRequest(feedbackValidation.updateFeedbackValidation),
  auth(ENUM_USER_ROLE.USER),
  feedbackController.updateFeedback,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  feedbackController.deleteFeedback,
);

export const feedbackRoutes = router;
