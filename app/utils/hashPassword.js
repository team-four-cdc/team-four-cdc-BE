const argon2 = require("argon2");

const hash = async (password) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
};

const verify = async (hash, password) => {
  return await argon2.verify(hash, password);
};

module.exports = {
  hash,
  verify,
};
