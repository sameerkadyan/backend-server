const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  course: String,

  semester: Number,
});

module.exports = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);