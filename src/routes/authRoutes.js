const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../middleware/uploadMiddleware");

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// 📝 Register
router.post("/register", authController.registerUser);

// OTP Verification
router.post("/verify-otp", authController.verifyOTP);

// 🔐 Login
router.post("/login", authController.loginUser);

// 👤 Profile
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile
);

// 📸 Upload Profile Photo
router.post(
  "/upload-profile",
  authMiddleware,
  uploadMiddleware.single("profilePhoto"),
  authController.uploadProfilePhoto
);

module.exports = router;