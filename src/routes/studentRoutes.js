const express = require("express");
const router = express.Router();

// 🔐 Middleware
const authMiddleware = require("../middleware/authMiddleware");

// 🎯 Controllers
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");


// ==============================
// CRUD ROUTES (Protected)
// ==============================

// ➕ CREATE student
router.post("/", authMiddleware, createStudent);

// 📖 READ all students (only logged-in user's)
router.get("/", authMiddleware, getStudents);

// 🔍 READ single student
router.get("/:id", authMiddleware, getStudentById);

// ✏️ UPDATE student
router.put("/:id", authMiddleware, updateStudent);

// ❌ DELETE student
router.delete("/:id", authMiddleware, deleteStudent);


module.exports = router;