const nodemailer = require('nodemailer');

// Create a transporter
 const sendOtp = (email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yours Gmail',
      pass: 'Yours Password',
  
    }
  });

const generatedOTP = Math.floor(100000 + Math.random() * 900000);
const mailOptions = {
  from: 'abhibruce2@gmail.com',
  to: `${email}`,
  subject: 'OTP Verification',
  text: `Your OTP for verification is: ${generatedOTP}`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
return generatedOTP
}

module.exports = {
  sendOtp
};
