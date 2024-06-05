const QuizService = require("../service/quiz.service");

var QuizController = {
    createQuiz: async (req, res, next) => {
        try {
            const { title, questions } = req.body;
            const newQuiz = await QuizService.createQuiz({ title, questions });

            res.status(201).json({
                status: true,
                message: "Quiz created successfully.",
                data: newQuiz,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    getQuizzes: async (req, res, next) => {
        try {
            const quizzes = await QuizService.getQuizzes();
            res.status(200).json({
                status: true,
                message: "All quiz fetched successfully.",
                data: quizzes,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    getQuizById: async (req, res, next) => {
        try {
            const { quizId } = req.params;
            const quiz = await QuizService.getQuizById(quizId);

            res.status(200).json({
                status: true,
                message: "Quiz fetched successfully.",
                data: quiz,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    updateQuiz: async (req, res, next) => {
        try {
            const { quizId } = req.params;
            const { title, questions } = req.body;
            const updatedQuiz = await QuizService.updateQuiz(quizId, {
                title,
                questions,
            });

            res.status(200).json({
                status: true,
                message: "Quiz updated successfully.",
                data: updatedQuiz,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    deleteQuiz: async (req, res, next) => {
        try {
            const { quizId } = req.params;
            await QuizService.deleteQuiz(quizId);

            res.status(200).json({
                status: true,
                message: "Quiz deleted successfully.",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },
};

module.exports = QuizController;
