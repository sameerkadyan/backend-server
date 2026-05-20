const Student = require("../../../models/Student");
const sendResponse = require("../../../utils/sendResponse");

const updateStudentController = async (req, res) => {
    try{
        const student = await Student.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id,
            },

            req.body,

            {  new:true }
        );

        if(!student){
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
            "User upadated successfully",
            {
                student,
            }
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

module.exports = updateStudentController;