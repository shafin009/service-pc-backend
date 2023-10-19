"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackValidation = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ required_error: 'comment is required' }),
    }),
});
const updateFeedbackValidation = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ required_error: 'comment is required' }),
    }),
});
exports.feedbackValidation = {
    createFeedbackValidation,
    updateFeedbackValidation,
};
