import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import generateJWT from '../../config/plugins/generate-jwt.plugin.js';
import { OrderService } from '../orders/order.service.js';
import {
  validateLogin,
  validateUpdateUser,
  validateUser,
} from './user.schema.js';
import { UserService } from './user.service.js';

const userService = new UserService();
const orderService = new OrderService();
export const createUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userExist = await userService.findUserByEmail(userData.email);

  if (userExist) {
    return next(new AppError('User with this email already exist', 404));
  }

  const newUser = await userService.createUser(userData);

  const token = await generateJWT(newUser.id);

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userExist = await userService.findUserByEmail(userData.email);

  if (!userExist) {
    return next(new AppError('This account does not exist', 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    userExist.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(userExist.id);

  return res.status(200).json({
    token,
    user: {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validateUpdateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const updatedUser = await userService.updateUser(user, userData);

  return res.status(200).json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await userService.deleteUser(user);

  return res.status(204).json(null);
});

export const findOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderService.findOneOrder(id);
  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }
  return res.status(200).json({
    id: order.id,
    mealId: order.mealId,
    userId: order.userId,
    totalPrice: order.totalPrice,
    quantity: order.quantity,
    status: order.status,
    meal: order.meal,
  });
});
