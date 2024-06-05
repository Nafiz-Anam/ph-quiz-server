const User = require("../schema/user.schema");

const UserService = {
    details: async (userId) => {
        try {
            const user = await User.findById(userId).select("-password -__v");
            if (!user) {
                throw new Error("User not found");
            }

            return user;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = UserService;
