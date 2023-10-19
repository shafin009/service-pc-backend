"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqValidation = void 0;
const zod_1 = require("zod");
const createFAQValidation = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'question is required' }),
        answer: zod_1.z.string({ required_error: 'answer is required' }),
    }),
});
const updateFAQValidation = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'question is required' }).optional(),
        answer: zod_1.z.string({ required_error: 'answer is required' }).optional(),
    }),
});
exports.faqValidation = {
    createFAQValidation,
    updateFAQValidation,
};
