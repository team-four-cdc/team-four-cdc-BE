const appRoot = require('app-root-path');
const crypto = require('crypto');

const {
  errorHandler: {
    BadRequest
  }
} = require(`${appRoot}/app/utils`);
const { User: UserModel, Auth: AuthModel } = require(`${appRoot}/app/models`);
const { jwtUtil, dateUtil } = require(`${appRoot}/app/utils`);
const { userConstant } = require(`${appRoot}/app/constants`);

function userService() {
  function _pbkdf2Async(password, salt, iterations, keylen, digest) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key);
        }
      });
    });
  }

  async function verificationUserLinkHandler(code) {
    console.log(code, '=====>>>');
    const authUserData = await AuthModel.findOneByGenerateCode(code);

    if (!authUserData) {
      throw new BadRequest('Please do a registration first');
    }

    const existingUserData = await UserModel.findOneByQuery({ id: authUserData.user_id });

    if (existingUserData.is_verified) {
      throw new BadRequest('Data is already verified');
    }

    const convertedExpiryDate = dateUtil.convertDateToMillisecond(authUserData.expiry_date);
    const convertedNewDate = dateUtil.convertDateToMillisecond(new Date());

    console.log(authUserData.expiry_date.getDay(), '======', convertedNewDate);

    return existingUserData;
  }

  // should add db transaction
  async function createUserReaderHandler(userData) {
    // logger info
    const { fullName, email, password } = userData;
    const salt = crypto.randomBytes(16).toString('hex');
    const transformEmail = email.toLowerCase();
    // check isEmailExist && role

    const createdToken = await jwtUtil.sign({ transformEmail });
    const hashedPassword = await _pbkdf2Async(password, salt, 310000, 32, 'sha256');

    const mappedNewUserData = {
      full_name: fullName,
      email,
      password: hashedPassword.toString('hex'),
      role: [userConstant.ROLE.READER],
      author: null,
      token: createdToken,
      photo_url: null,
      is_verified: false,
      salt,
      created_at: new Date(),
      updated_at: new Date()
    };

    const newUser = await UserModel.insertNew(mappedNewUserData);

    if (newUser) {
      throw new BadRequest('Try Error');
    }
  }

  return {
    createUserReaderHandler,
    verificationUserLinkHandler
  };
}

module.exports = userService;
