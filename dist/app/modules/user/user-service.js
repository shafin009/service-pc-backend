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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable no-empty */
const client_1 = require("@prisma/client");
const createbcrypt_1 = __importDefault(require("../../../helpers/createbcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllUsers = (requesterRole) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    if (requesterRole === client_1.UserRole.super_admin) {
        result = yield prisma_1.default.user.findMany({});
    }
    else if (requesterRole === client_1.UserRole.admin) {
        result = yield prisma_1.default.user.findMany({
            where: {
                role: client_1.UserRole.user,
            },
        });
    }
    else if (requesterRole === client_1.UserRole.user) {
        result = [];
    }
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, rest = __rest(payload, ["password"]);
    let genarateBycryptPass;
    if (password) {
        genarateBycryptPass = yield (0, createbcrypt_1.default)(password);
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: genarateBycryptPass
            ? Object.assign(Object.assign({}, rest), { password: genarateBycryptPass }) : rest,
    });
    return result;
});
const deleteUser = (id, requestRole) => __awaiter(void 0, void 0, void 0, function* () {
    const deletingUser = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: true,
            phone: true,
            address: true,
            userName: true,
            profileImage: true,
        },
    });
    if (!deletingUser) {
        throw new Error('User not found');
    }
    if (requestRole === client_1.UserRole.super_admin) {
    }
    else if (requestRole === client_1.UserRole.admin) {
        if (deletingUser.role === client_1.UserRole.user) {
        }
        else {
            throw new Error('An admin cannot delete an admin or super admin.');
        }
    }
    else {
        throw new Error('Permission denied: You are not authorized to delete users.');
    }
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: true,
            phone: true,
            address: true,
            userName: true,
            profileImage: true,
        },
    });
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
