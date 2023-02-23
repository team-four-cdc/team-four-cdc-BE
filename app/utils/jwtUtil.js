require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET_PRODUCTION || process.env.TOKEN_SECRET_DEVELOPMENT;
const expIn = process.env.TOKEN_EXP;

function jwtUtil() {
  function sign(payload) {
    /**
   * generate token with Synchronous sign (HMAC SHA256)
   */
    return jwt.sign(payload, secret, { expiresIn: expIn });
  }

  function verify(token) {
    /**
   * if token and secret key match, decode will contain user information
   */
    return jwt.verify(token, secret);
  }

  return {
    sign,
    verify
  };
}

module.exports = jwtUtil;
