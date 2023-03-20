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
    return this.userModel.create({
      email,
      password,
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
}

module.exports = UserService;
