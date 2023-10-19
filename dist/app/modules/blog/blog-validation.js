"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        body: zod_1.z.string({ required_error: 'Body is required' }),
    }),
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        body: zod_1.z.string({ required_error: 'Body is required' }).optional(),
    }),
});
exports.blogValidation = {
    createBlogValidation,
    updateBlogValidation,
};
