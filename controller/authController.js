require("dotenv").config();
const AuthService = require("../service/auth.service");

var AuthController = {
    registration: async (req, res, next) => {
        try {
            const { full_name, email, password } = req?.body;
            const { user, token } = await AuthService.registration({
                full_name,
                email,
                password,
            });

            const userResponse = {
                id: user?._id,
                name: user?.full_name,
                token,
            };

            res.status(201).json({
                status: true,
                message: "User registered successfully.",
                data: userResponse,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req?.body;
            const { user, token } = await AuthService.login(email, password);

            const userResponse = {
                id: user?._id,
                name: user?.name,
                role: user?.role,
                token,
            };

            res.status(201).json({
                status: true,
                message: "User signed in successfully.",
                data: userResponse,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },
};

module.exports = AuthController;
