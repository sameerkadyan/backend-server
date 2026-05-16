const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {

  try {

    const response = await resend.emails.send({

      from: "onboarding@resend.dev",

      to,

      subject: "Email Verification OTP",

      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      `,

    });

    console.log("Email sent:", response);

  } catch (error) {

    console.log("EMAIL ERROR:", error);

    throw error;

  }

};

module.exports = sendEmail;