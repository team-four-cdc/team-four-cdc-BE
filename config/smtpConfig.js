require('dotenv').config();

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  from: {
    name: process.env.SMTP_FROM_NAME,
    email: process.env.SMTP_FROM_EMAIL,
  },
};

module.exports = smtpConfig;
