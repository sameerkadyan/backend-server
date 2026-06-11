const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendResponse = require("../../utils/sendResponse")
const User = require("../../models/User")

// ==============================
// 🔐 LOGIN
// ==============================
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Validate input
        if (!email || !password) {
            return sendResponse(
                res,
                400,
                false,
                "All fields required"
            );
        }

        // 🔍 Check user
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(
                res,
                400,
                false,
                "Invalid email or password"
            );
        }

        // ❌ BLOCK UNVERIFIED USERS
        if (!user.isVerified) {

            return sendResponse(
                res,
                403,
                false,
                "Please verify your email first"
            );
        }

        // 🔍 Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(
                res,
                400,
                false,
                "Invalid email or password"
            );
        }

        // 🔐 Generate token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET, // better to use env
            { expiresIn: "7d" }
        );

        return sendResponse(
            res,
            200,
            true,
            "Login successful",
            {
                token,
                role: user.role,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            }
        );

    } catch (error) {
        console.error("LOGIN ERROR:", error); // ✅ fixed variable
        // return res.status(500).json({ message: "Server Error" });
        return sendResponse(
            res,
            500,
            false,
            "Server Error"
        );
    }
};

module.exports = loginController;