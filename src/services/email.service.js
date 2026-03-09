const nodemailer = require('nodemailer');
const config = require('../config');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  // Initialize email transporter
  initialize() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });
  }

  // Send log alert email
  async sendLogAlert(to, logEvent, logDevice, logRisk, logInfo, time) {
    const riskColor = {
      'High': 'red',
      'Warn': 'orange',
      'Info': 'blue'
    }[logRisk] || 'gray';

    const mailOptions = {
      from: config.smtp.from,
      to: to,
      subject: `OpenFAI Log Alert - ${logRisk}: ${logEvent}`,
      html: `
        <h2>New Log Created</h2>
        <p><strong>Event:</strong> ${logEvent}</p>
        <p><strong>Device:</strong> ${logDevice}</p>
        <p><strong>Risk Level:</strong> <span style="color: ${riskColor}">${logRisk}</span></p>
        <p><strong>Info:</strong> ${logInfo}</p>
        <p><strong>Time:</strong> ${time}</p>
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return { success: true, info };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }

  // Send generic email
  async sendEmail(to, subject, html) {
    const mailOptions = {
      from: config.smtp.from,
      to: to,
      subject: subject,
      html: html
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return { success: true, info };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }
}

module.exports = new EmailService();
