const User = require("../schema/user.schema");
const generateAuthToken = require("../middleware/tokenManager/token");
const {
    notifyAnalyticsUpdate,
    notifyActiveUsersUpdate,
} = require("../wsServer");

const AuthService = {
    registration: async (userData) => {
        try {
            const user = new User(userData);
            let savedUser = await user.save();

            notifyAnalyticsUpdate();

            const tokenPayload = {
                id: savedUser._id,
                role: savedUser.role,
            };
            const token = generateAuthToken(tokenPayload);

            return { user, token };
        } catch (error) {
            throw error;
        }
    },

    login: async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found!");
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error("Invalid email/password!");
        }
        notifyActiveUsersUpdate();

        const tokenPayload = {
            id: user._id,
            role: user.role,
        };
        const token = await generateAuthToken(tokenPayload);

        return { user, token };
    },
};

module.exports = AuthService;
