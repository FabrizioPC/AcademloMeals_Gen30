import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  validateRestaurant,
  validateUpdateRestaurant,
} from './restaurant.schema.js';
import { RestaurantService } from './restaurant.service.js';
import { validateReview, validateUpdateReview } from './review.schema.js';

const restaurantService = new RestaurantService();

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const restaurant = await restaurantService.createRestaurant(restaurantData);

  return res.status(201).json(restaurant);
});

export const findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await restaurantService.findAllRestaurants();
  return res.status(200).json(restaurants);
});

export const findRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  return res.status(200).json({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    rating: restaurant.rating,
    reviews: restaurant.reviews,
  });
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { hasError, errorMessages, restaurantData } = validateUpdateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const updatedRestaurant = await restaurantService.updateRestaurant(
    restaurant,
    restaurantData
  );

  return res.status(200).json({
    id: updatedRestaurant.id,
    name: updatedRestaurant.name,
    address: updatedRestaurant.address,
    rating: updatedRestaurant.rating,
  });
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurantService.deleteRestaurant(restaurant);
  return res.status(201).json(null);
});

export const createReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hasError, errorMessages, reviewData } = validateReview(req.body);
  const { sessionUser } = req;
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const review = await restaurantService.createReview({
    userId: sessionUser.id,
    comment: reviewData.comment,
    restaurantId: id,
    rating: reviewData.rating,
  });
  return res.status(201).json({
    id: review.id,
    userId: review.userId,
    comment: review.comment,
    restaurantId: review.restaurantId,
    rating: review.rating,
  });
});
export const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { hasError, errorMessages, reviewData } = validateUpdateReview(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const updatedReview = await restaurantService.updateReview(
    review,
    reviewData
  );

  return res.status(200).json({
    comment: updatedReview.comment,
    rating: updatedReview.rating,
  });
});
export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await restaurantService.deleteReview(review);
  return res.status(204).json(null);
});
