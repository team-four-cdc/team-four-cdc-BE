const { hash } = require('../utils/hashPassword');
class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async createUser({
    email,
    password,
    fullName,
    role,
    author,
    photoUrl,
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
      fullName,
      role,
      author,
      photoUrl,
      token,
      is_verified: false,
    });
  }

  async findUserByToken({ token }) {
    return this.userModel.findOne({
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

  static async verifyUser(user) {
    await user.update({ is_verified: true });
    return user.save();
  }

  async getUser({ userId }) {
    return this.userModel.findByPk(userId);
  }

  async findUserEmailByRole({ email, role }) {
    return this.userModel.findOne({
      // eslint-disable-next-line no-console
      logging: console.log,
      where: { email, role, is_verified: true },
    });
  }

  static async checkValidRole(role) {
    const roleList = ['reader', 'creator'];
    if (!roleList.includes(role)) {
      return false;
    }
    return true;
  }
}

module.exports = UserService;
