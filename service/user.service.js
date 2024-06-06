const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");

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

    list: async (query) => {
        try {
            const {
                search = "",
                sortBy = "createdAt",
                sortOrder = "asc",
                limit = 10,
                page = 1,
                role,
            } = query;
            const searchQuery = search
                ? {
                      $or: [
                          { full_name: new RegExp(search, "i") },
                          { email: new RegExp(search, "i") },
                      ],
                  }
                : {};
            const filterQuery = role ? { role } : {};

            const users = await User.find({ ...searchQuery, ...filterQuery })
                .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .select("-password -__v");

            const count = await User.countDocuments({
                ...searchQuery,
                ...filterQuery,
            });

            return {
                users,
                count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            };
        } catch (error) {
            throw error;
        }
    },

    update: async (userId, updateData) => {
        try {
            const user = await User.findByIdAndUpdate(userId, updateData, {
                new: true,
            }).select("-password -__v");
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    },

    delete: async (userId) => {
        try {
            const user = await User.findByIdAndDelete(userId).select(
                "-password -__v"
            );
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (userId, oldPassword, newPassword) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                throw new Error("Old password is incorrect");
            }

            user.password = newPassword;
            await user.save();

            return { message: "Password changed successfully" };
        } catch (error) {
            throw error;
        }
    },
};

module.exports = UserService;
