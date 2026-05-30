const mongoose = require("mongoose");

const teacherProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  subject: String,

  experience: Number,
});

module.exports = mongoose.model(
  "TeacherProfile",
  teacherProfileSchema
);