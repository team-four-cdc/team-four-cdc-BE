const appRoot = require('app-root-path');
const smtpConfig = require(`${appRoot}/config/smtpConfig`);
const nodemailer = require('nodemailer');

class MailService {
  constructor() {}

  async sendVerificationEmail({ token, to }) {
    const { from, ...config } = smtpConfig;
    const transporter = nodemailer.createTransport(config);
    const info = await transporter.sendMail({
      from: `${from.name} <${from.email}>`,
      to,
      subject: 'Account Verification',
      text: `Verify using this link ${process.env.FE_HOST}/verifikasi/${token}`,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

module.exports = MailService;
