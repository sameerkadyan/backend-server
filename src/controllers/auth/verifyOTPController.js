const sendResponse = require("../../utils/sendResponse")
const User = require("../../models/User")

// VERIFY OTP
const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
    return sendResponse(
        res,
        404,
        false,
        "User not found"
    );
    }

    if (
      user.otp !== otp ||
      user.otpExpire < Date.now()
    ) {
    return sendResponse(
        res,
        400,
        false,
        "Invalid or expired OTP"
    );
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();


    return sendResponse(
        res,
        200,
        true,
        "Email verified successfully"
    );

  } catch (error) {
   console.log("VERIFY OTP ERROR:", error);

   return sendResponse(
    res,
    500,
    false,
    "Server Error"
   );
  }
};

module.exports = verifyOTP;
