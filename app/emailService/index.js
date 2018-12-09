'use strict';

const Email = require('email-templates');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');

class MailUtils {
  constructor() {
    this.mailgunOptions = {
      auth: {
        api_key:
          process.env.EMAIL_API_KEY || 'key-eeac6a89becd0c257ede043e421760ea',
        domain: process.env.EMAIL_DOMAIN || 'dev-email.enouvo.com'
      }
    };
    this.emailFrom = process.env.EMAIL_FROM || 'danamaxstorm@gmail.com';
    const transport = mailgunTransport(this.mailgunOptions);
    const emailClient = nodemailer.createTransport(transport);
    this.email = new Email({
      message: {
        from: this.emailFrom
      },
      send: true,
      transport: emailClient
    });
  }

  async sendEmailResetPassword(receiverEmail, resetPasswordUrl) {
    try {
      const result = await this.email.send({
        template: 'forgot-password',
        message: {
          to: receiverEmail
        },
        locals: {
          email: receiverEmail,
          action_url: resetPasswordUrl
        }
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new MailUtils();
