const moment = require('moment');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const TokenService = require('./tokenService');
const emailHelper = require('../helpers/emailHelper');

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
  }

  async sendEmail(params) {
    const tokenService = new TokenService();
    try {
      const generateToken = await tokenService.signToken(
        { email: params.email, role: params.role },
        { expiresIn: '1h' }
      );
      const url = `${process.env.BASE_APP_URL}/auth/reset-password/?token=${generateToken}`;
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
      await this.nodemailerTransport.sendMail(mailOptions);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async resetPassword(params) {
    try {
      const now = moment().unix();
      const extractedToken = jwt.decode(params.resetPasswordToken);

      if (now > extractedToken['exp']) {
        throw new Error('Reset Password Token is Expired!');
      }
      this.userModel.update(
        { password: params.newPassword },
        {
          where: {
            email: extractedToken['email'],
            role: extractedToken['role'],
          },
          individualHooks: true,
        }
      );
      return true;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = AuthService;
