const UserService = require("../service/user.service");

var UserController = {
    details: async (req, res, next) => {
        try {
            const userId = req?.params?.userId || req?.user?.id;
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
            console.log(error);
            res.status(500).json({
                status: false,
                message: error?.message || "Internal server error!",
            });
        }
    },
};

module.exports = UserController;
