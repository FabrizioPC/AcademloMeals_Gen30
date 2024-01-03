import express from 'express';
import { validExistRestaurant } from '../restaurants/restaurant.middleware.js';
import {
  createMeal,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from './meal.controller.js';
import { validateExistMeal } from './meal.middleware.js';
import { protect, restrictTo } from '../users/user.middleware.js';

export const router = express.Router();

router.route('/').get(findAllMeals);
router.route('/:id').get(validateExistMeal, findOneMeal);

router.use(protect, restrictTo('admin'));

router
  .route('/:id')
  .post(validExistRestaurant, createMeal)
  .patch(validateExistMeal, updateMeal)
  .delete(validateExistMeal, deleteMeal);
