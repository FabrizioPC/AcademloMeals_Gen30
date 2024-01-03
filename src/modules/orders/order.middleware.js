import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { OrderService } from './order.service.js';

const orderService = new OrderService();

export const validateExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await orderService.findOneOrder(id);
  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }
  if (order.status !== 'active') {
    return next(new AppError('Order its completed or cancelled', 400));
  }
  req.order = order;
  req.user = order.user;
  next();
});
