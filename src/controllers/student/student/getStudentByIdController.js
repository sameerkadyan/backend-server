const Student = require("../../../models/StudentProfile");
const sendResponse = require("../../../utils/sendResponse");

const getStudentByIdController = async (req, res) => {
    try {
        const student = await Student.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!student) {
            return sendResponse(
                res,
                404,
                false,
                "Student not found"
            );
        }

        return sendResponse(
            res,
            200,
            true,
            "Student fetched successfully",
            {
                student,
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
}

module.exports = getStudentByIdController;