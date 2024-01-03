import express from 'express';
import { protect, protectAccountOwner } from '../users/user.middleware.js';
import {
  createOrder,
  deleteOrder,
  findAllOrders,
  updateOrder,
} from './order.controller.js';
import { validateExistOrder } from './order.middleware.js';

export const router = express.Router();

router.use(protect);

router.route('/').post(createOrder);
router.route('/me').get(findAllOrders);
router
  .route('/:id')
  .patch(validateExistOrder, protectAccountOwner, updateOrder)
  .delete(validateExistOrder, protectAccountOwner, deleteOrder);
