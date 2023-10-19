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
exports.BookingService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const serviceCheaker_1 = require("../../../helpers/serviceCheaker");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const booking_constants_1 = require("./booking-constants");
const getAllBooking = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        const searchAbleFields = booking_constants_1.bookingSearchableFields.map(single => {
            const query = {
                [single]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            };
            return query;
        });
        andCondition.push({
            OR: searchAbleFields,
        });
    }
    if (Object.keys(filters).length) {
        andCondition.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.booking.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions.sortBy]: paginationOptions.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.booking.count();
    const output = {
        data: result,
        meta: { page, limit: size, total },
    };
    return output;
});
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const minimumScheduleDate = new Date();
    minimumScheduleDate.setHours(minimumScheduleDate.getHours() + 3);
    if (payload.scheduleDate <= minimumScheduleDate) {
        throw new Error('Schedule date must be at least 3 hours from now.');
    }
    const existingBooking = yield prisma_1.default.booking.findFirst({
        where: {
            scheduleDate: payload.scheduleDate,
        },
    });
    if (existingBooking) {
        throw new Error('Another booking already exists at the same schedule date.');
    }
    yield (0, serviceCheaker_1.serviceCheaker)(payload.userId, payload.serviceId);
    const newBooking = yield prisma_1.default.booking.create({
        data: payload,
    });
    return newBooking;
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    if (!(result === null || result === void 0 ? void 0 : result.id)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Data Not found');
    }
    return result;
});
const getSingleUserAllBooking = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId,
        },
    });
    return result;
});
const updateBooking = (id, payload, requestRole) => __awaiter(void 0, void 0, void 0, function* () {
    if (requestRole !== client_1.UserRole.admin && requestRole !== client_1.UserRole.super_admin) {
        throw new Error('Permission denied: You are not authorized to change the booking status.');
    }
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBooking = (id, requestRole) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: { id },
        include: { user: true },
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found!');
    }
    if (booking.status === client_1.bookingStatus.accepted) {
        if (requestRole !== client_1.UserRole.admin &&
            requestRole !== client_1.UserRole.super_admin) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Cannot delete an accepted booking.');
        }
    }
    const result = yield prisma_1.default.booking.delete({
        where: { id },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found!');
    }
    return result;
});
exports.BookingService = {
    getAllBooking,
    createBooking,
    updateBooking,
    getSingleBooking,
    getSingleUserAllBooking,
    deleteBooking,
};
