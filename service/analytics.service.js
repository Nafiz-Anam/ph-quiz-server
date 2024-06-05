const mongoose = require("mongoose");
const QuizResult = require("../schema/quizResult.schema");

const AnalyticsService = {
    getAnalytics: async (quizId) => {
        const results = await QuizResult.aggregate([
            { $match: { quizId: new mongoose.Types.ObjectId(quizId) } },
            {
                $group: {
                    _id: "$quizId",
                    averageScore: { $avg: "$score" },
                    totalParticipants: { $sum: 1 },
                },
            },
        ]);
        return results[0];
    },
};

module.exports = AnalyticsService;
