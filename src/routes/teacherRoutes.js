const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const getTeacherProfileController = require("../controllers/teacher/getTeacherProfileController");

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("teacher"),
  getProfile
);

module.exports = router;