const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
  },
  course: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // 🔐 ties student to logged-in user
  },
}, {
  collection: "students",
  timestamps: true,
});

module.exports = mongoose.model("Student", studentSchema);