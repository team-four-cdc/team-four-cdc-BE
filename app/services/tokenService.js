const jwt = require("jsonwebtoken");

class TokenService {
  constructor() {}

  async signToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET);

    return token;
  }
}

module.exports = TokenService;
