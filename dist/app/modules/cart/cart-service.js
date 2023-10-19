"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const serviceCheaker_1 = require("../../../helpers/serviceCheaker");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllCart = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findMany({ where: {} });
    return result;
});
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, serviceCheaker_1.serviceCheaker)(payload.userId, payload.serviceId);
    const newCart = yield prisma_1.default.cart.create({
        data: payload,
    });
    return newCart;
});
const getSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const getSingleUserAllCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findMany({
        where: {
            userId: userId,
        },
    });
    return result;
});
const updateCart = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.delete({
        where: { id },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cart not found!');
    }
    return result;
});
exports.cartService = {
    getAllCart,
    createCart,
    updateCart,
    getSingleCart,
    deleteCart,
    getSingleUserAllCart,
};
