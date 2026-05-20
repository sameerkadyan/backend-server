const User = require("../../../models/User") 
const sendResponse = require("../../../utils/sendResponse");

// ==============================
// 👤 GET PROFILE
// ==============================
const getProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
    return sendResponse(
      res,
      404,
      false,
      "User not found"
    );
    }

    return sendResponse(
      res,
      200,
      true,
      "Profile fetched successfully",
      user
    );

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    return sendResponse(
      res,
      500,
      false,
      "Server Error"
    );
  }
};

module.exports = getProfileController;