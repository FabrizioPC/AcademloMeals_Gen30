import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const createMealSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name of meal is required',
  }),
  price: z
    .number({
      invalid_type_error: 'Price must be a number',
      required_error: 'price is required',
    })
    .min(0.5, { message: 'Price of meal is too low' }),
});

const updateMealSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'name of meal is required',
  }),
  price: z
    .number({
      invalid_type_error: 'Price must be a number',
      required_error: 'price is required',
    })
    .min(0.5, { message: 'Price of meal is too low' }),
});

export function validateMeal(data) {
  const result = createMealSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    mealData,
  };
}
export function validateUpdateMeal(data) {
  const result = updateMealSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    mealData,
  };
}
