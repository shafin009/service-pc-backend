import express from 'express';
import { authRoutes } from '../modules/auth/auth-route';
import { blogRoutes } from '../modules/blog/blog-route';
import { bookingRoutes } from '../modules/booking/booking-route';
import { cartRoutes } from '../modules/cart/cart-route';
import { categoryRoutes } from '../modules/category/category-route';
import { faqRoutes } from '../modules/faq/faq-route';
import { feedbackRoutes } from '../modules/feedback/feedback-route';
import { profileRoutes } from '../modules/profiles/profile-route';
import { reviewAndRatingRoutes } from '../modules/review&rating/review&rating-route';
import { serviceRoutes } from '../modules/service/service-route';
import { userRoutes } from '../modules/user/user-route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/service',
    route: serviceRoutes,
  },

  {
    path: '/cart',
    route: cartRoutes,
  },

  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/booking',
    route: bookingRoutes,
  },
  {
    path: '/faq',
    route: faqRoutes,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
  {
    path: '/reviewAndRating',
    route: reviewAndRatingRoutes,
  },
  {
    path: '/feedback',
    route: feedbackRoutes,
  },

  {
    path: '/profile',
    route: profileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
