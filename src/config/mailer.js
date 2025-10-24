import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.SMTP_USER)
console.log(process.env.SMTP_PASS)
const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT, 10) || 587,
//   secure: process.env.SMTP_PORT === '465',
  service: process.env.EMAIL_SERVICE,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }
});




export default transporter;
