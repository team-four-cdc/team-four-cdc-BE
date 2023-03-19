const jwt = require('jsonwebtoken');

class TokenService {
  constructor() {}

  async signToken(payload, options = undefined) {
    const token = jwt.sign(payload, process.env.SECRET, options);

    return token;
  }
}

module.exports = TokenService;
