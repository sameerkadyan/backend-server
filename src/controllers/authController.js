const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendEmail = require("../utils/sendEmail.js");

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==============================
// 📝 REGISTER
// ==============================
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    // If VERIFIED user already exists
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // If UNVERIFIED user exists
    if (existingUser && !existingUser.isVerified) {

      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpire =
        Date.now() + 5 * 60 * 1000;

      await existingUser.save();

      await sendEmail(email, otp);

      return res.status(200).json({
        message: "OTP resent to your email"
      });
    }

    // Create NEW user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpire: Date.now() + 5 * 60 * 1000
    });

    await newUser.save();

    // Send Email
    await sendEmail(email, otp);

    res.status(201).json({
      message: "OTP sent to your email",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (
      user.otp !== otp ||
      user.otpExpire < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP"
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ==============================
// 🔐 LOGIN
// ==============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔍 Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ❌ BLOCK UNVERIFIED USERS
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    // 🔍 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔐 Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // better to use env
      { expiresIn: "1d" }
    );

    // ✅ Send proper JSON response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error); // ✅ fixed variable
    return res.status(500).json({ message: "Server Error" });
  }
};


// ==============================
// 👤 GET PROFILE
// ==============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//Upload Profile photo

const uploadProfilePhoto = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    user.profilePhoto = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile photo updated",
      profilePhoto: user.profilePhoto,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


module.exports = {
  registerUser,
  loginUser,
  getProfile,
  verifyOTP,
  uploadProfilePhoto,
};