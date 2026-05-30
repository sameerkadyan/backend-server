const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // ROLE
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
  },

  profilePhoto: {
    type: String,
    default: "",
  },

  // EMAIL VERIFICATION
  isVerified: {
    type: Boolean,
    default: false,
  },

  // OTP
  otp: {
    type: String,
  },

  // OTP Expiry Time
  otpExpire: {
    type: Date,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);