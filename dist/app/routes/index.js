"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth-route");
const blog_route_1 = require("../modules/blog/blog-route");
const booking_route_1 = require("../modules/booking/booking-route");
const cart_route_1 = require("../modules/cart/cart-route");
const category_route_1 = require("../modules/category/category-route");
const faq_route_1 = require("../modules/faq/faq-route");
const feedback_route_1 = require("../modules/feedback/feedback-route");
const profile_route_1 = require("../modules/profiles/profile-route");
const review_rating_route_1 = require("../modules/review&rating/review&rating-route");
const service_route_1 = require("../modules/service/service-route");
const user_route_1 = require("../modules/user/user-route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/service',
        route: service_route_1.serviceRoutes,
    },
    {
        path: '/cart',
        route: cart_route_1.cartRoutes,
    },
    {
        path: '/category',
        route: category_route_1.categoryRoutes,
    },
    {
        path: '/booking',
        route: booking_route_1.bookingRoutes,
    },
    {
        path: '/faq',
        route: faq_route_1.faqRoutes,
    },
    {
        path: '/blog',
        route: blog_route_1.blogRoutes,
    },
    {
        path: '/reviewAndRating',
        route: review_rating_route_1.reviewAndRatingRoutes,
    },
    {
        path: '/feedback',
        route: feedback_route_1.feedbackRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.profileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
