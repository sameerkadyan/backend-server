const Student = require("../../../models/StudentProfile");
const sendResponse = require("../../../utils/sendResponse");

const deleteStudentController = async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if(!student){
            return sendResponse(
                res,
                404,
                false,
                "Student not found",
            );
        }

        return sendResponse(
            res,
            200,
            true,
            "Student delete successfully"
        );
    } catch (error){
        console.log(error);

        return sendResponse(
            res,
            500,
            false,
            "Server error"
        );
    }
}

module.exports = deleteStudentController;