const mongoose = require("mongoose");

const teacherProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TeacherProfile",
  teacherProfileSchema
);