"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog-controller");
const blog_validation_1 = require("./blog-validation");
const router = express_1.default.Router();
router.get('/', blog_controller_1.blogController.getAllBlog);
router.get('/:id', blog_controller_1.blogController.getSingleBlog);
router.post('/create-blog', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogValidation), blog_controller_1.blogController.createBlog);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogValidation), blog_controller_1.blogController.updateBlog);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), blog_controller_1.blogController.deleteBlog);
exports.blogRoutes = router;
