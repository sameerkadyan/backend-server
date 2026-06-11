const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const getTeacherProfileController = require("../controllers/teacher/getTeacherProfileController");

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("teacher"),
  getTeacherProfileController
);

module.exports = router;