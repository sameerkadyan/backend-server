const express = require("express");
const router = express.Router();


const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");
const verifyOTPController = require("../controllers/auth/verifyOTPController");

const authMiddleware = require("../middleware/authMiddleware");

// 📝 Register
router.post("/register", registerController);

// OTP Verification
router.post("/verify-otp", verifyOTPController);

// 🔐 Login
router.post("/login", loginController);


module.exports = router;