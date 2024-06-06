const Joi = require("joi");
const helpers = require("../../helper/general_helper");

const authValidation = {
    register: async (req, res, next) => {
        const registerSchema = Joi.object({
            full_name: Joi.string().required().messages({
                "any.required": "Full-name is required",
                "string.empty": "Full-name cannot be empty",
            }),
            role: Joi.string().valid("user", "admin", "").allow(null).messages({
                "string.base": `"Role" should be of type 'text'.`,
                "any.only": `"Role" should be either 'user', 'admin', or empty.`,
            }),
            email: Joi.string().required().email().messages({
                "any.required": "Email is required",
                "string.email": "Email must be a valid email address",
                "string.empty": "Email cannot be empty",
            }),
            password: Joi.string().required().min(6).max(16).messages({
                "any.required": "Password is required",
                "string.min": "Password must be at least 6 characters long",
                "string.max": "Password cannot exceed 16 characters",
                "string.empty": "Password cannot be empty",
            }),
        });

        try {
            const result = registerSchema.validate(req?.body);
            const userAvailable = await helpers.userAvailable(req?.body?.email);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            if (userAvailable) {
                return res.status(500).json({
                    status: false,
                    message: "Email already signed up. Sign in to continue.",
                });
            }
            next();
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    login: async (req, res, next) => {
        const loginSchema = Joi.object({
            email: Joi.string().required().email().messages({
                "any.required": "Email is required",
                "string.email": "Email must be a valid email address",
                "string.empty": "Email cannot be empty",
            }),
            password: Joi.string().required().min(6).max(16).messages({
                "any.required": "Password is required",
                "string.min": "Password must be at least 6 characters long",
                "string.max": "Password cannot exceed 16 characters",
                "string.empty": "Password cannot be empty",
            }),
        });

        try {
            const result = loginSchema.validate(req?.body);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            next();
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },
};

module.exports = authValidation;
