const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const TokenService = require('./tokenService');
const emailHelper = require('../helpers/emailHelper');
const db = require('../models');

class AuthService {
  constructor({ userModel }) {
    this.userModel = userModel;
    this.nodemailerTransport = mailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    this.tokenService = new TokenService({ tokenModel: db.Token });
  }

  async sendEmail(params) {
    const tokenService = new TokenService({ tokenModel: db.Token });
    try {
      const generateToken = await tokenService.signToken(
        { email: params.email, role: params.role },
        { expiresIn: '1d' }
      );
      const url = `${process.env.BASE_APP_URL}/ubah-password/${generateToken}?role=${params.role}`;
      const mailOptions = {
        from: 'CDC Team 4',
        to: params.email,
        subject: 'Reset Password',
        text: `Reset your password`,
        html: emailHelper.getEmailTemplateResetPassword({
          username: params.full_name || params.email,
          link: url,
        }),
      };
      const decodeToken = jwt.decode(generateToken);
      /*
      Store expire_in as unix format date 
      */
      await tokenService.storeToken({
        user_id: params.id,
        generate_token: generateToken,
        expire_in: decodeToken['exp'],
      });
      await this.nodemailerTransport.sendMail(mailOptions);
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
