const Student = require("../../../models/Student");
const sendResponse = require("../../../utils/sendResponse");

// ==============================
// ➕ CREATE Student
// ==============================
const createStudentController = async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      userId: req.user.id, // 🔐 from authMiddleware
    });

    await student.save();
    return sendResponse(
        res,
        201,
        true,
        "Student created succussfully",
        {
            student,
        }
    );

  } catch (error) {
    console.error(error);
    return sendResponse(
        res,
        500,
        false,
        "Server error"
    );
  }
};

module.exports = createStudentController;