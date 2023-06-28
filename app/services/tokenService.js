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

  /* eslint-disable camelcase */
  async deleteToken({ generateToken }) {
    return this.tokenModel.destroy({
      where: {
        generateToken,
      },
    });
  }

  async verifyToken({ token }) {
    const result = jwt.verify(token, this.SECRET);
    return result;
  }

  async isValidToken({ generateToken }) {
    const dateNow = moment().unix();
    const getToken = await this.tokenModel.findOne({
      where: { generateToken },
    });

    if (getToken) {
      if (dateNow > moment(getToken?.expire_in).unix()) {
        return false;
      }
      return true;
    }

    return false;
  }
}

module.exports = TokenService;
