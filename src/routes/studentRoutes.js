const express = require("express");
const router = express.Router();

// Middleware
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Student Controllers
const getStudents = require("../controllers/student/student/getStudentsController");
const createStudent = require("../controllers/student/student/createStudentController");
const updateStudent = require("../controllers/student/student/updateStudentController");
const deleteStudent = require("../controllers/student/student/deleteStudentController");
const getStudentById = require("../controllers/student/student/getStudentByIdController");

// Profile Controllers
const getProfile = require("../controllers/student/profile/getProfileController");
const uploadProfilePhoto = require("../controllers/student/profile/uploadProfilePhotoController");

// ==============================
// PROFILE ROUTES
// ==============================

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("student"),
  getProfile
);

router.post(
  "/upload-profile",
  authMiddleware,
  authorizeRoles("student"),
  uploadMiddleware.single("profilePhoto"),
  uploadProfilePhoto
);

// ==============================
// STUDENT CRUD
// ==============================

router.post(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  createStudent
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  getStudents
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("student"),
  getStudentById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("student"),
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("student"),
  deleteStudent
);

module.exports = router;