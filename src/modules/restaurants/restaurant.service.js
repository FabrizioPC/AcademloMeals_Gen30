import User from '../users/user.model.js';
import Restaurant from './restaurant.model.js';
import Review from './review.model.js';

export class RestaurantService {
  async createRestaurant(data) {
    return Restaurant.create(data);
  }
  async findAllRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: 'active',
      },
      include: [
        {
          model: Review,
          attributes: ['id', 'userId', 'comment', 'rating'],
          required: false,
          where: {
            status: 'active',
          },
        },
      ],
    });
  }
  async findOneRestaurant(id) {
    return await Restaurant.findOne({
      where: {
        status: 'active',
        id,
      },
      include: [
        {
          model: Review,
          attributes: ['id', 'userId', 'comment', 'rating'],
          required: false,
          where: {
            status: 'active',
          },
        },
      ],
    });
  }
  async updateRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }
  async deleteRestaurant(restaurant) {
    return await restaurant.update({ status: 'disabled' });
  }
  async findOneReview(id) {
    return await Review.findOne({
      where: {
        status: 'active',
        id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }
  async createReview(data) {
    return Review.create(data);
  }
  async updateReview(review, data) {
    return await review.update(data);
  }
  async deleteReview(review, data) {
    return await review.update({ status: 'disabled' });
  }
}
