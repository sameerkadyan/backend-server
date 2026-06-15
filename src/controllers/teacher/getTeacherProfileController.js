const TeacherProfile = require("../../models/TeacherProfile");
const sendResponse = require("../../utils/sendResponse");

const getTeacherProfileController = async (req, res) => {
  console.log("JWT USER:", req.user);
  console.log("SEARCHING USER ID:", req.user.id);
  try {
    const teacher = await TeacherProfile.findOne({
      userId: req.user.id,
    }).populate("userId", "name email");

    if (!teacher) {
      return sendResponse(
        res,
        404,
        false,
        "Teacher profile not found"
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Teacher profile fetched successfully",
      teacher
    );
  } catch (error) {
    console.error(error);

    return sendResponse(
      res,
      500,
      false,
      "Server Error"
    );
  }
};

module.exports = getTeacherProfileController;