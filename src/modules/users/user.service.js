import User from './user.model.js';

export class UserService {
  async findUserById(id) {
    return await User.findOne({
      where: {
        status: true,
        id,
      },
    });
  }
  async findUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }
  async createUser(data) {
    return await User.create(data);
  }
  async updateUser(user, data) {
    return await user.update(data);
  }
  async deleteUser(user) {
    return await user.update({ status: false });
  }
}
