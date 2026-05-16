const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },

});

const sendEmail = async (to, otp) => {

  await transporter.sendMail({

    from: process.env.EMAIL,

    to,

    subject: "Email Verification OTP",

    text: `Your OTP is ${otp}`,

  });

};

module.exports = sendEmail;