"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_controller_1 = require("./service-controller");
const service_validation_1 = require("./service-validation");
const router = express_1.default.Router();
router.post('/create-service', (0, validateRequest_1.default)(service_validation_1.serviceValidation.createServiceValidation), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.createService);
router.get('/', service_controller_1.ServiceController.getAllService);
router.get('/:id', service_controller_1.ServiceController.getSingleService);
router.patch('/:id', (0, validateRequest_1.default)(service_validation_1.serviceValidation.updateServiceValidation), service_controller_1.ServiceController.updateService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), service_controller_1.ServiceController.deleteService);
exports.serviceRoutes = router;
