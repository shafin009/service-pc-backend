"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingValidation = void 0;
const zod_1 = require("zod");
const createReviewAndRatingValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }),
        rating: zod_1.z.number({ required_error: 'rating is required' }).min(1).max(5),
        review: zod_1.z.string({ required_error: 'review is required' }),
    }),
});
const updateReviewAndRatingValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({ required_error: 'serviceId is required' }).optional(),
        rating: zod_1.z
            .number({ required_error: 'rating is required' })
            .min(1)
            .max(5)
            .optional(),
        review: zod_1.z.string({ required_error: 'review is required' }).optional(),
    }),
});
exports.reviewAndRatingValidation = {
    createReviewAndRatingValidation,
    updateReviewAndRatingValidation,
};
