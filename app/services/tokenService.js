const jwt = require('jsonwebtoken');
const moment = require('moment');

class TokenService {
  constructor({ tokenModel }) {
    this.tokenModel = tokenModel;
  }

  async signToken(payload, options = undefined) {
    const token = jwt.sign(payload, process.env.SECRET, options);
    return token;
  }

  async decodeToken(payload, options = undefined) {
    const result = jwt.decode(payload.token, process.env.SECRET, options);
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
