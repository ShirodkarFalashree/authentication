require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let otpStore = {}; // Store OTPs temporarily

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAIL_PASSWORD, // Your App Password
  },
});

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp; // Store OTP temporarily

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'OTP sent successfully' });
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Clear OTP after verification
    return res.json({ success: true });
  }
  res.status(400).json({ message: 'Invalid OTP' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
