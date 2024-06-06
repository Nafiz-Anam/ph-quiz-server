const UserService = require("../service/user.service");

var UserController = {
    details: async (req, res, next) => {
        try {
            const userId = req?.params?.userId;
            if (!userId) {
                return res
                    .status(400)
                    .json({ status: false, message: "User Id is required." });
            }

            const userDetails = await UserService.details(userId);
            res.status(201).json({
                status: true,
                message: "User details fetched successfully.",
                data: userDetails,
            });
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },

    list: async (req, res, next) => {
        try {
            const { users, count, totalPages, currentPage } =
                await UserService.list(req.query);
            res.status(200).json({
                status: true,
                message: "Users list fetched successfully.",
                data: users,
                meta: { count, totalPages, currentPage },
            });
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },

    update: async (req, res, next) => {
        try {
            const userId = req?.params?.userId || req?.user?.id;
            const updateData = req.body;

            if (!userId) {
                return res
                    .status(400)
                    .json({ status: false, message: "User Id is required." });
            }

            const updatedUser = await UserService.update(userId, updateData);
            res.status(200).json({
                status: true,
                message: "User updated successfully.",
            });
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },

    delete: async (req, res, next) => {
        try {
            const userId = req?.params?.userId || req?.user?.id;
            if (!userId) {
                return res
                    .status(400)
                    .json({ status: false, message: "User Id is required." });
            }

            await UserService.delete(userId);
            res.status(200).json({
                status: true,
                message: "User deleted successfully.",
            });
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const userId = req?.user?.id;
            const { oldPassword, newPassword } = req.body;

            if (!userId || !oldPassword || !newPassword) {
                return res.status(400).json({
                    status: false,
                    message:
                        "User Id, old password, and new password are required.",
                });
            }

            const result = await UserService.changePassword(
                userId,
                oldPassword,
                newPassword
            );
            res.status(200).json({
                status: true,
                message: result.message,
            });
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },
};

module.exports = UserController;
