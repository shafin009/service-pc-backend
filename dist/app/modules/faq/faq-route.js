"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faq_controller_1 = require("./faq-controller");
const faq_validation_1 = require("./faq-validation");
const router = express_1.default.Router();
router.post('/create-faq', (0, validateRequest_1.default)(faq_validation_1.faqValidation.createFAQValidation), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.faqController.createFaq);
router.get('/', faq_controller_1.faqController.getAllFaq);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.faqController.getSingleFaq);
router.patch('/:id', (0, validateRequest_1.default)(faq_validation_1.faqValidation.updateFAQValidation), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.faqController.updateFaq);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), faq_controller_1.faqController.deleteFaq);
exports.faqRoutes = router;
