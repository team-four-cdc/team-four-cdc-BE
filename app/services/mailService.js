const appRoot = require('app-root-path');
const smtpConfig = require(`${appRoot}/config/smtpConfig`);
const nodemailer = require('nodemailer');
const emailHelper = require('../helpers/emailHelper');

class MailService {
  static async sendVerificationEmail({ token, to, full_name }) {
    const { from, ...config } = smtpConfig;
    const transporter = nodemailer.createTransport(config);
    const url = `${process.env.FE_HOST}/verifikasi/${token}`;
    const info = await transporter.sendMail({
      from: `${from.name} <${from.email}>`,
      to,
      subject: 'Account Verification',
      text: 'Verify using this link',
      html: emailHelper.getEmailVerificationPassword({
        username: full_name,
        link: url,
      }),
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  static async sendForgotPasswordEmail({ to, url }) {
    const { from, ...config } = smtpConfig;
    const transporter = nodemailer.createTransport(config);
    return transporter.sendMail({
      from: `${from.name} <${from.email}>`,
      to,
      subject: 'Reset Password',
      text: 'Reset your password',
      html: emailHelper.getEmailTemplateResetPassword({
        username: to,
        link: url,
      }),
    });
  }
}

module.exports = MailService;
