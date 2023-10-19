import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reviewAndRating } from './review&rating-controller';
import { reviewAndRatingValidation } from './review&rating-validation';

const router = express.Router();

router.post(
  '/create-review',
  validateRequest(reviewAndRatingValidation.createReviewAndRatingValidation),
  auth(ENUM_USER_ROLE.USER),
  reviewAndRating.createReviewAndRating,
);

router.get('/', reviewAndRating.getAllReviewAndRating);
router.get('/:id', reviewAndRating.getSingleReviewAndRating);

router.patch(
  '/:id',
  validateRequest(reviewAndRatingValidation.updateReviewAndRatingValidation),
  auth(ENUM_USER_ROLE.USER),
  reviewAndRating.updateReviewAndRating,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  reviewAndRating.deleteReviewAndRating,
);

export const reviewAndRatingRoutes = router;
