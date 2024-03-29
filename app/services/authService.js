const jwt = require('jsonwebtoken');
const TokenService = require('./tokenService');
const MailService = require('./mailService');
const db = require('../models');
const { hash } = require('../utils/hashPassword');
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
        expire_in: decodeToken.exp,
      });
      await this.mailService.sendForgotPasswordEmail({ to: params.email, url });
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  }

  async resetPassword({ newPassword, resetPasswordToken }) {
    try {
      const extractedToken = jwt.decode(resetPasswordToken);

      const isValidToken = await this.tokenService.isValidToken({
        generate_token: resetPasswordToken,
      });

      if (isValidToken) {
        const hashedPassword = await hash(newPassword);

        await this.userModel.update(
          { password: hashedPassword },
          {
            where: {
              email: extractedToken.email,
              role: extractedToken.role,
              is_verified: true,
            },
          }
        );

        await this.tokenService.deleteToken({
          generate_token: resetPasswordToken,
        });

        return { success: true, error: null };
      }

      return {
        success: false,
        error: { message: 'Expired token for resetting password!' },
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  }
}

module.exports = AuthService;
