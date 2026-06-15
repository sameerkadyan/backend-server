const TeacherProfile = require("../../models/TeacherProfile");
const sendResponse = require("../../utils/sendResponse");

const getTeacherProfileController = async (req, res) => {
  try {
    let teacher = await TeacherProfile.findOne({
      userId: req.user.id,
    }).populate("userId", "name email");

    // Auto-create profile if missing
    if (!teacher) {
      teacher = await TeacherProfile.create({
        userId: req.user.id,
        subject: "",
        experience: 0,
      });

      teacher = await TeacherProfile.findById(
        teacher._id
      ).populate("userId", "name email");
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