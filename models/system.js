const nodemailer = require('nodemailer');
require('dotenv').config();

class System {

    constructor() {}

    async sendEmail(toEmail, message) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "bassem2108471@miuegypt.edu.eg",
                    pass: "25102002bassem18",
                },
            });

            const mailOptions = {
                from: "bassem2108471@miuegypt.edu.eg",
                to: toEmail,
                subject: 'Reminder: Take your medicine',
                text: message || 'Remember to take your medicine now.',
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

module.exports = System;