"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_rating_controller_1 = require("./review&rating-controller");
const review_rating_validation_1 = require("./review&rating-validation");
const router = express_1.default.Router();
router.post('/create-review', (0, validateRequest_1.default)(review_rating_validation_1.reviewAndRatingValidation.createReviewAndRatingValidation), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), review_rating_controller_1.reviewAndRating.createReviewAndRating);
router.get('/', review_rating_controller_1.reviewAndRating.getAllReviewAndRating);
router.get('/:id', review_rating_controller_1.reviewAndRating.getSingleReviewAndRating);
router.patch('/:id', (0, validateRequest_1.default)(review_rating_validation_1.reviewAndRatingValidation.updateReviewAndRatingValidation), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), review_rating_controller_1.reviewAndRating.updateReviewAndRating);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), review_rating_controller_1.reviewAndRating.deleteReviewAndRating);
exports.reviewAndRatingRoutes = router;
