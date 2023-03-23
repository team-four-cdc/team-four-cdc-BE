const jwt = require('jsonwebtoken');
const TokenService = require('./tokenService');
const MailService = require('../services/mailService');
const db = require('../models');

class AuthService {
  constructor({ userModel }) {
    this.userModel = userModel;
    this.tokenService = new TokenService({ tokenModel: db.Token });
    this.mailService = new MailService();
  }

  async sendEmail(params) {
    const tokenService = new TokenService({ tokenModel: db.Token });
    try {
      const generateToken = await tokenService.signToken(
        { email: params.email, role: params.role },
        { expiresIn: '1d' }
      );
      const url = `${process.env.FE_HOST}/ubah-password/${generateToken}?role=${params.role}`;
      const decodeToken = jwt.decode(generateToken);
      /*
      Store expire_in as unix format date 
      */
      await tokenService.storeToken({
        user_id: params.id,
        generate_token: generateToken,
        expire_in: decodeToken['exp'],
      });
      await this.mailService.sendForgotPasswordEmail({ to: params.email, url });
      return true;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(params) {
    try {
      const extractedToken = jwt.decode(params.resetPasswordToken);

      const isValidToken = await this.tokenService.isValidToken({
        generate_token: params.resetPasswordToken,
      });

      if (isValidToken) {
        await this.userModel.update(
          { password: params.newPassword },
          {
            where: {
              email: extractedToken['email'],
              role: extractedToken['role'],
            },
            individualHooks: true,
          }
        );
        await this.tokenService.deleteToken({
          generate_token: params.resetPasswordToken,
        });
        return { success: true, error: null };
      }

      return {
        success: false,
        error: { message: 'Expired token for resetting password!' },
      };
    } catch (e) {
      throw e;
    }
  }
}

module.exports = AuthService;
