import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealService } from '../meals/meal.service.js';
import { validateOrder } from './order.schema.js';
import { OrderService } from './order.service.js';

const orderService = new OrderService();
const mealService = new MealService();

export const findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await orderService.findAllOrders(sessionUser.id);
  return res.status(200).json(orders);
});

export const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { hasError, errorMessages, orderData } = validateOrder(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const meal = await mealService.findOneMeal(orderData.mealId);
  if (!meal) {
    return next(
      new AppError(`Meal with this id: ${orderData.mealId} not found`, 404)
    );
  }

  const priceTotal = meal.price * orderData.quantity;

  const order = await orderService.createOrder({
    mealId: orderData.mealId,
    userId: sessionUser.id,
    totalPrice: priceTotal,
    quantity: orderData.quantity,
  });

  return res.status(201).json({
    id: order.id,
    mealId: order.mealId,
    userId: order.userId,
    totalPrice: `$` + order.totalPrice,
    quantity: order.quantity,
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await orderService.updateOrder(order);
  return res.status(200).json({ message: 'Order completed succesfully' });
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await orderService.deleteOrder(order);
  return res.status(200).json(null);
});
