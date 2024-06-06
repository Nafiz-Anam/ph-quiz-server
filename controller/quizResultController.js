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

    getResults: async (req, res, next) => {
        try {
            const { userId, quizId } = req.query;
            const results = await QuizResultService.getResults({
                userId,
                quizId,
            });

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
