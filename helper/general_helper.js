const User = require("../schema/user.schema");

var helpers = {
    userAvailable: async (email) => {
        const user = await User.findOne({ email });

        if (user) {
            return true;
        } else {
            return false;
        }
    },
};

module.exports = helpers;
