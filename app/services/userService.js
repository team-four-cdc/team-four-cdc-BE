const { hash } = require('../utils/hashPassword');
class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async createUser({
    email,
    password,
    full_name,
    role,
    author,
    photo_url,
    token,
  }) {
    const user = await this.findDuplicateUser({ email, role });

    if (user) {
      return { error: { message: 'User already exists' } };
    }

    const hashedPassword = await hash(password);

    return this.userModel.create({
      email,
      password: hashedPassword,
      full_name,
      role,
      author,
      photo_url,
      token,
      is_verified: false,
    });
  }

  async findUserByToken({ token }) {
    return await this.userModel.findOne({
      where: { token, is_verified: false },
    });
  }

  async findUserByEmail({ email }) {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async findDuplicateUser({ email, role }) {
    return this.userModel.findOne({
      where: { email, role },
    });
  }

  async verifyUser(user) {
    await user.update({ is_verified: true });
    return await user.save();
  }

  async getUser({ user_id }) {
    return this.userModel.findByPk(user_id);
  }

  async findUserEmailByRole({ email, role }) {
    return await this.userModel.findOne({
      logging: console.log,
      where: { email, role, is_verified: true },
    });
  }

  async checkValidRole(role) {
    const roleList = ['reader', 'creator'];
    if (!roleList.includes(role)) {
      return false;
    }
    return true;
  }
}

module.exports = UserService;
