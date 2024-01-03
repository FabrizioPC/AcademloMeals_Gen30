import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const createRestaurantSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name of restaurant must be a string',
      required_error: 'Name restaurant is required',
    })
    .min(3, { message: 'Name of restaurant is too short' })
    .max(100, { message: 'Name of restaurant is too long' }),
  address: z
    .string({
      invalid_type_error: 'Address must be a string',
      required_error: 'Address is required',
    })
    .min(3, { message: 'Address is too short' })
    .max(100, { message: 'Address is too long' }),
  rating: z
    .number({
      invalid_type_error: 'Rating must be a number',
      required_error: 'rating is required',
    })
    .int({ invalid_type_error: 'The rating must be a integer' })
    .min(1, { message: 'Rating number must be greater than 1' })
    .max(5, { message: 'The maximum rating number is 5' }),
});

const updateRestaurantSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name of restaurant must be a string',
      required_error: 'Name restaurant is required',
    })
    .min(3, { message: 'Name of restaurant is too short' })
    .max(100, { message: 'Name of restaurant is too long' }),
  address: z
    .string({
      invalid_type_error: 'Address must be a string',
      required_error: 'Address is required',
    })
    .min(3, { message: 'Address is too short' })
    .max(100, { message: 'Address is too long' }),
});

export function validateRestaurant(data) {
  const result = createRestaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}

export function validateUpdateRestaurant(data) {
  const result = updateRestaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}
