import express from 'express';
import { router as userRoute } from '../modules/users/user.route.js';
import { router as mealRoute } from '../modules/meals/meal.route.js';
import { router as restaurantRoute } from '../modules/restaurants/restaurant.route.js';
import { router as orderRoute } from '../modules/orders/order.route.js';

export const router = express.Router();

router.use('/users', userRoute);
router.use('/meals', mealRoute);
router.use('/restaurants', restaurantRoute);
router.use('/orders', orderRoute);
