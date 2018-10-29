'use strict';

const nodemailer = require('nodemailer');

// SMTP_MAIL = smtps://username:password@smtp.example.com/?pool=true
const poolConfig = process.env.SMTP_MAIL || {
  service: 'Gmail',
  auth: {
    user: 'longnt.developer@gmail.com',
    pass: 'longnsusu189'
  }
};
const transporter = nodemailer.createTransport(poolConfig);

function sendMail(email, subject, message) {
  const mailOptions = {
    from: 'CSM EnouvoSpace <space@enouvo.com>',
    to: email,
    subject,
    html: message
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }

      resolve(info);
    });
  });
};

module.exports = sendMail;
