const Student = require("../../../models/StudentProfile");
const sendResponse = require("../../../utils/sendResponse");

const getStudentsController = async(req, res) => {
    try{
        const students = await Student.find({
            userId: req.user.id,
        });

        return sendResponse(
            res,
            200,
            true,
            "Profile fetched successfully",
            {
                students,
            }
        );
    } catch (error) {
        console.log(error);

        return sendResponse(
            res,
            500,
            false,
            "Error fetching students"
        );
    }
};

module.exports = getStudentsController;