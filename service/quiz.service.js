const Quiz = require("../schema/quiz.schema");

const QuizService = {
    createQuiz: async (quizData) => {
        try {
            const newQuiz = new Quiz(quizData);
            const savedQuiz = await newQuiz.save();
            return savedQuiz;
        } catch (error) {
            throw error;
        }
    },

    getQuizzes: async (query) => {
        try {
            const {
                search = "",
                sortBy = "createdAt",
                sortOrder = "asc",
                limit = 10,
                page = 1,
            } = query;
            const searchQuery = search
                ? { title: new RegExp(search, "i") }
                : {};

            const quizzes = await Quiz.find(searchQuery)
                .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .select("-__v");

            const count = await Quiz.countDocuments(searchQuery);

            return {
                quizzes,
                count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
            };
        } catch (error) {
            throw error;
        }
    },

    getQuizById: async (id) => {
        try {
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                throw new Error("Quiz not found!");
            }
            return quiz;
        } catch (error) {
            throw error;
        }
    },

    updateQuiz: async (id, updateData) => {
        try {
            const quiz = await Quiz.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            if (!quiz) {
                throw new Error("Quiz not found!");
            }
            return quiz;
        } catch (error) {
            throw error;
        }
    },

    deleteQuiz: async (id) => {
        try {
            const quiz = await Quiz.findByIdAndDelete(id);
            if (!quiz) {
                throw new Error("Quiz not found!");
            }
            return quiz;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = QuizService;
