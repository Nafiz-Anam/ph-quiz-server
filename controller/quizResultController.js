const QuizResultService = require("../service/quizResult.service");

var QuizResultController = {
    submitResult: async (req, res, next) => {
        try {
            const { userId, quizId, answers } = req?.body;
            await QuizResultService.submitResult({
                userId,
                quizId,
                answers,
            });

            res.status(201).json({
                status: true,
                message: "Quiz result submitted successfully.",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    getResultsByUser: async (req, res, next) => {
        try {
            const { userId } = req?.params;
            const results = await QuizResultService.getResultsByUser(userId);

            res.status(200).json({
                status: true,
                data: results,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    getResultsByQuiz: async (req, res, next) => {
        try {
            const { quizId } = req?.params;
            const results = await QuizResultService.getResultsByQuiz(quizId);

            res.status(200).json({
                status: true,
                data: results,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },

    getAggregatedResults: async (req, res, next) => {
        try {
            const { quizId } = req?.params;
            const { interval } = req?.query;
            const results = await QuizResultService.getAggregatedResults(
                quizId,
                interval
            );

            res.status(200).json({
                status: true,
                data: results,
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

module.exports = QuizResultController;
