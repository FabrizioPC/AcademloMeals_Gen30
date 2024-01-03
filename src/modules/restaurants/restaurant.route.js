import express from 'express';
import {
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  findAllRestaurants,
  findRestaurantById,
  updateRestaurant,
  updateReview,
} from './restaurant.controller.js';
import {
  validExistRestaurant,
  validExistReview,
} from './restaurant.middleware.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
} from '../users/user.middleware.js';

export const router = express.Router();

router.route('/').get(findAllRestaurants);
router.route('/:id').get(validExistRestaurant, findRestaurantById);

router.use(protect);

router.route('/').post(restrictTo('admin'), createRestaurant);

router
  .route('/:id')
  .patch(restrictTo('admin'), validExistRestaurant, updateRestaurant)
  .delete(restrictTo('admin'), validExistRestaurant, deleteRestaurant);

router.route('/reviews/:id').post(validExistRestaurant, createReview);

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    updateReview
  )
  .delete(
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    deleteReview
  );
