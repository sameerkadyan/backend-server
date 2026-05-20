const sendResponse = require("../../../utils/sendResponse")

//Upload Profile photo

const uploadProfilePhotoController = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
    return sendResponse(
        res,
        404,
        false,
        "User not found"
    );
    }

    if (!req.file) {
    //   return res.status(400).json({
    //     message: "No image uploaded",
    //   });
    return sendResponse(
        res,
        400,
        false,
        "No image uploaded"
    );
    }

    user.profilePhoto = req.file.path;

    await user.save();

    return sendResponse(
      res,
      200,
      true,
      "Profile photo updated",
      {
        profilePhoto: user.profilePhoto,
      }
    );

  } catch (error) {

    console.log(error);

    return sendResponse(
      res,
      500,
      false,
      "Server error"
    );

  }
};

module.exports = uploadProfilePhotoController;
