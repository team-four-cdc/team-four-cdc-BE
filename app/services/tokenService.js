const jwt = require('jsonwebtoken');
const moment = require('moment');

class TokenService {
  constructor({ tokenModel }) {
    this.tokenModel = tokenModel;
    this.SECRET = process.env.SECRET;
  }

  async signToken(payload, options = undefined) {
    const token = jwt.sign(payload, this.SECRET, options);
    return token;
  }

  async decodeToken(payload, options = undefined) {
    const result = jwt.decode(payload.token, this.SECRET, options);
    return result;
  }

  async storeToken(payload) {
    return this.tokenModel.create({
      ...payload,
    });
  }

  async deleteToken({ generate_token }) {
    return this.tokenModel.destroy({
      where: {
        generate_token,
      },
    });
  }

  async verifyToken({ token }) {
    const result = jwt.verify(token, this.SECRET);
    return result;
  }

  async isValidToken({ generate_token }) {
    const dateNow = moment().unix();
    const getToken = await this.tokenModel.findOne({
      where: { generate_token },
    });

    if (getToken) {
      if (dateNow > moment(getToken?.expire_in).unix()) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  }
}

module.exports = TokenService;
