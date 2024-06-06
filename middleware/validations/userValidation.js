const Joi = require("joi");

const userValidation = {
    details: async (req, res, next) => {
        const userIdSchema = Joi.object({
            userId: Joi.string().required().messages({
                "any.required": "User Id is required",
                "string.empty": "User Id cannot be empty",
            }),
        });

        try {
            const result = userIdSchema.validate(req?.params);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            next();
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    list: async (req, res, next) => {
        const listSchema = Joi.object({
            role: Joi.string()
                .valid("user", "admin")
                .allow(null)
                .optional()
                .messages({
                    "string.base": `"Role" should be of type 'text'.`,
                    "any.only": `"Role" should be either 'user' or 'admin'`,
                }),
            page: Joi.number().integer().min(1).optional().messages({
                "number.base": `"Page" should be of type 'number'.`,
                "number.min": `"Page" should be greater than or equal to 1.`,
            }),
            limit: Joi.number().integer().min(1).optional().messages({
                "number.base": `"Limit" should be of type 'number'.`,
                "number.min": `"Limit" should be greater than or equal to 1.`,
            }),
            sortBy: Joi.string().optional(),
            order: Joi.string().valid("asc", "desc").optional().messages({
                "string.base": `"Order" should be of type 'text'.`,
                "any.only": `"Order" should be either 'asc' or 'desc'.`,
            }),
        });

        try {
            const result = listSchema.validate(req.query);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            next();
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    update: async (req, res, next) => {
        const updateSchema = Joi.object({
            full_name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            role: Joi.string()
                .valid("user", "admin")
                .allow(null)
                .optional()
                .messages({
                    "string.base": `"Role" should be of type 'text'.`,
                    "any.only": `"Role" should be either 'user' or 'admin'.`,
                }),
        })
            .required()
            .min(1)
            .messages({
                "object.min": "At least one field is required to update.",
            });

        try {
            const result = updateSchema.validate(req.body);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            next();
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    delete: async (req, res, next) => {
        const userIdSchema = Joi.object({
            userId: Joi.string().required().messages({
                "any.required": "User Id is required",
                "string.empty": "User Id cannot be empty",
            }),
        });

        try {
            const result = userIdSchema.validate(req.params);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            next();
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    changePassword: async (req, res, next) => {
        const changePasswordSchema = Joi.object({
            oldPassword: Joi.string().required().messages({
                "any.required": "Old password is required",
                "string.empty": "Old password cannot be empty",
            }),
            newPassword: Joi.string().required().messages({
                "any.required": "New password is required",
                "string.empty": "New password cannot be empty",
            }),
        });

        try {
            const result = changePasswordSchema.validate(req.body);
            if (result.error) {
                return res.status(400).json({
                    status: false,
                    message: result?.error?.message,
                });
            }
            next();
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },
};

module.exports = userValidation;
