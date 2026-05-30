const User = require("../../models/User");
const bcrypt = require("bcrypt");

const sendEmail = require("../../utils/sendEmail");
const sendResponse = require("../../utils/sendResponse");

// Generate OTP
const generateOTP = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

// ==============================
// 📝 REGISTER
// ==============================
const registerController = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return sendResponse(
        res,
        400,
        false,
        "All fields are required"
      );
    }

    // Check valid role
    const validRoles = [
      "student",
      "teacher",
      "admin",
    ];

    if (!validRoles.includes(role)) {
      return sendResponse(
        res,
        400,
        false,
        "Invalid role"
      );
    }

    // Check existing user
    const existingUser =
      await User.findOne({ email });

    // VERIFIED user already exists
    if (
      existingUser &&
      existingUser.isVerified
    ) {
      return sendResponse(
        res,
        400,
        false,
        "User already exists"
      );
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // UNVERIFIED user exists
    if (
      existingUser &&
      !existingUser.isVerified
    ) {

      existingUser.name = name;

      existingUser.password =
        hashedPassword;

      existingUser.role = role;

      existingUser.otp = otp;

      existingUser.otpExpire =
        Date.now() + 5 * 60 * 1000;

      await existingUser.save();

      await sendEmail(email, otp);

      return sendResponse(
        res,
        200,
        true,
        "OTP resent to your email"
      );
    }

    // Create NEW user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpire:
        Date.now() + 5 * 60 * 1000,
    });

    await newUser.save();

    // Send Email
    await sendEmail(email, otp);

    return sendResponse(
      res,
      201,
      true,
      "OTP sent to your email",
      {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      }
    );

  } catch (error) {

    console.log(error);

    return sendResponse(
      res,
      500,
      false,
      error.message
    );
  }
};

module.exports = registerController;