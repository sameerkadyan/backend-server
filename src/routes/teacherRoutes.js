const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const getTeacherProfileController = require("../controllers/teacher/getTeacherProfileController");

router.get(
  "/profile",
  verifyToken,
  getTeacherProfileController
);

module.exports = router;