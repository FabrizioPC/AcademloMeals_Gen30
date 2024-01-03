import express from 'express';
import {
  createUser,
  deleteUser,
  findOneOrder,
  login,
  updateUser,
} from './user.controller.js';
import {
  protect,
  protectAccountOwner,
  validExistUser,
} from './user.middleware.js';
import { findAllOrders } from '../orders/order.controller.js';

export const router = express.Router();

router.route('/signup').post(createUser);

router.route('/login').post(login);

router.use(protect);

router.route('/:id').patch(validExistUser, protectAccountOwner, updateUser);

router.route('/:id').delete(validExistUser, protectAccountOwner, deleteUser);

router.route('/orders').get(findAllOrders);

router.route('/orders/:id').get(findOneOrder);
