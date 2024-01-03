import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMeal, validateUpdateMeal } from './meal.schema.js';
import { MealService } from './meal.service.js';

const mealService = new MealService();

export const findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await mealService.findAllMeals();
  return res.status(200).json(meals);
});

export const findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  return res.status(200).json(meal);
});
export const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hasError, errorMessages, mealData } = validateMeal(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const meal = await mealService.createMeal({
    name: mealData.name,
    price: mealData.price,
    restaurantId: id,
  });
  return res.status(201).json({
    id: meal.id,
    name: meal.name,
    price: meal.price,
    restaurantId: meal.restaurantId,
  });
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { hasError, errorMessages, mealData } = validateUpdateMeal(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const updatedMeal = await mealService.updateMeal(meal, mealData);
  return res.status(200).json({
    id: updatedMeal.id,
    name: updatedMeal.name,
    price: updatedMeal.price,
  });
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await mealService.deleteMeal(meal);
  return res.status(204).json(null);
});
