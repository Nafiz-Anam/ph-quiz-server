const QuizResult = require("../schema/quizResult.schema");
const User = require("../schema/user.schema");
const Quiz = require("../schema/quiz.schema");

const AnalyticsService = {
    getDashboardAnalytics: async () => {
        try {
            // Get total users count
            const totalUsers = await User.countDocuments({});

            // Get total quizzes count
            const totalQuizzes = await Quiz.countDocuments({});

            // Get total average quiz score
            const totalQuizAverageScoreResult = await QuizResult.aggregate([
                { $group: { _id: null, averageScore: { $avg: "$score" } } },
            ]);
            const totalQuizAverageScore =
                totalQuizAverageScoreResult[0]?.averageScore || 0;

            // Get individual quiz details
            const quizzes = await Quiz.find({});
            const quizDetails = await Promise.all(
                quizzes.map(async (quiz) => {
                    const results = await QuizResult.find({ quizId: quiz._id });
                    const totalScore = results.reduce(
                        (acc, result) => acc + result.score,
                        0
                    );
                    const averageScore = totalScore / results.length || 0;

                    // Get question count for the quiz
                    const questionCount = quiz.questions.length;

                    return {
                        _id: quiz._id,
                        title: quiz.title,
                        averageScore,
                        totalParticipants: results.length,
                        questionCount,
                    };
                })
            );

            return {
                totalUsers,
                totalQuizzes,
                totalQuizAverageScore,
                quizDetails,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = AnalyticsService;
