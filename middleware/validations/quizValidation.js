const Joi = require("joi");

const quizValidation = {
    create: async (req, res, next) => {
        const createQuizSchema = Joi.object({
            title: Joi.string().required().messages({
                "any.required": "Title is required",
                "string.empty": "Title cannot be empty",
            }),
            description: Joi.string().required().messages({
                "any.required": "Description is required",
                "string.empty": "Description cannot be empty",
            }),
            questions: Joi.array()
                .items(
                    Joi.object({
                        question: Joi.string().required().messages({
                            "any.required": "Question is required",
                            "string.empty": "Question cannot be empty",
                        }),
                        options: Joi.array()
                            .items(
                                Joi.string().required().messages({
                                    "any.required": "Option is required",
                                    "string.empty": "Option cannot be empty",
                                })
                            )
                            .min(2)
                            .required()
                            .messages({
                                "array.min":
                                    "At least two options are required",
                                "any.required": "Options are required",
                            }),
                        correct_option: Joi.number()
                            .integer()
                            .min(0)
                            .required()
                            .messages({
                                "any.required": "Correct option is required",
                                "number.base":
                                    "Correct option must be a number",
                                "number.min":
                                    "Correct option must be at least 0",
                            }),
                    })
                )
                .min(1)
                .required()
                .messages({
                    "array.min": "At least one question is required",
                    "any.required": "Questions are required",
                }),
        });

        try {
            const result = createQuizSchema.validate(req.body);
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

    getById: async (req, res, next) => {
        const quizIdSchema = Joi.object({
            quizId: Joi.string().required().messages({
                "any.required": "Quiz Id is required",
                "string.empty": "Quiz Id cannot be empty",
            }),
        });

        try {
            const result = quizIdSchema.validate(req.params);
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
        const updateQuizSchema = Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            questions: Joi.array()
                .items(
                    Joi.object({
                        question: Joi.string().optional(),
                        options: Joi.array()
                            .items(Joi.string().optional())
                            .min(2)
                            .optional(),
                        correct_option: Joi.number()
                            .integer()
                            .min(0)
                            .optional(),
                    })
                )
                .optional(),
        })
            .min(1)
            .messages({
                "object.min": "At least one field is required to update.",
            });

        try {
            const result = updateQuizSchema.validate(req.body);
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
        const quizIdSchema = Joi.object({
            quizId: Joi.string().required().messages({
                "any.required": "Quiz Id is required",
                "string.empty": "Quiz Id cannot be empty",
            }),
        });

        try {
            const result = quizIdSchema.validate(req.params);
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
};

module.exports = quizValidation;
