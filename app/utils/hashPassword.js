const argon2 = require('argon2');

const hash = async (password) => {
  try {
    return argon2.hash(password);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return false;
  }
};

const verify = async (hashed, password) => argon2.verify(hashed, password);

module.exports = {
  hash,
  verify,
};
