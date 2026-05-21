const express = require("express");
const router = express.Router();

// 🔐 Middleware
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const getStudents = require("../controllers/student/student/getStudentsController");
const createStudent = require("../controllers/student/student/createStudentController");
const updateStudent = require("../controllers/student/student/updateStudentController");
const deleteStudent = require("../controllers/student/student/deleteStudentController");
const getStudentById = require("../controllers/student/student/getStudentByIdController");

const getProfile = require("../controllers/student/profile/getProfileController");
const uploadProfilePhoto = require("../controllers/student/profile/uploadProfilePhotoController");

// ==============================
// PROFILE ROUTES FIRST
// ==============================

router.get("/profile", authMiddleware, getProfile);

router.post(
  "/upload-profile",
  authMiddleware,
  uploadMiddleware.single("profilePhoto"),
  uploadProfilePhoto
);

// ==============================
// CRUD ROUTES
// ==============================

// ➕ CREATE student
router.post("/", authMiddleware, createStudent);

// 📖 READ all students
router.get("/", authMiddleware, getStudents);

// 🔍 READ single student
router.get("/:id", authMiddleware, getStudentById);

// ✏️ UPDATE student
router.put("/:id", authMiddleware, updateStudent);

// ❌ DELETE student
router.delete("/:id", authMiddleware, deleteStudent);

module.exports = router;