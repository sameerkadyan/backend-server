const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {

  const response = await resend.emails.send({

    from: "onboarding@resend.dev",

    to,

    subject: "Email Verification OTP",

    html: `
      <h2>Your OTP Code</h2>
      <h1>${otp}</h1>
    `,

  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  console.log("Email sent successfully");

};

module.exports = sendEmail;