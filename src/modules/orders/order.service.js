import Meal from '../meals/meal.model.js';
import Restaurant from '../restaurants/restaurant.model.js';
import User from '../users/user.model.js';
import Order from './order.model.js';

export class OrderService {
  async findAllOrders(userId) {
    return await Order.findAll({
      where: {
        userId,
      },
      attributes: ['id', 'mealId', 'userId', 'totalPrice', 'quantity'],
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price', 'restaurantId', 'status'],
          include: [
            {
              model: Restaurant,
              attributes: ['id', 'name', 'address', 'rating'],
            },
          ],
        },
      ],
    });
  }
  async findOneOrder(id) {
    return await Order.findOne({
      where: {
        id,
      },
      attributes: [
        'id',
        'mealId',
        'userId',
        'totalPrice',
        'quantity',
        'status',
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role'],
        },
        {
          model: Meal,
          attributes: ['id', 'name', 'price', 'restaurantId', 'status'],
          include: [
            {
              model: Restaurant,
              attributes: ['id', 'name', 'address', 'rating'],
            },
          ],
        },
      ],
    });
  }
  async createOrder(data) {
    return await Order.create(data);
  }
  async updateOrder(order) {
    return await order.update({ status: 'completed' });
  }
  async deleteOrder(order) {
    return await order.update({ status: 'cancelled' });
  }
}
