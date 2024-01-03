import Restaurant from '../restaurants/restaurant.model.js';
import Meal from './meal.model.js';

export class MealService {
  async findAllMeals() {
    return await Meal.findAll({
      where: {
        status: 'active',
      },
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: Restaurant,
          where: {
            status: 'active',
          },
          attributes: ['id', 'name', 'address', 'rating'],
        },
      ],
    });
  }
  async findOneMeal(id) {
    return await Meal.findOne({
      where: {
        status: 'active',
        id,
      },
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name', 'address', 'rating'],
        },
      ],
    });
  }
  async createMeal(data) {
    return await Meal.create(data);
  }
  async updateMeal(meal, data) {
    return await meal.update(data);
  }
  async deleteMeal(meal) {
    return await meal.update({ status: 'disabled' });
  }
}
