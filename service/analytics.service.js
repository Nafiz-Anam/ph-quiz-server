const QuizResult = require("../schema/quizResult.schema");
const User = require("../schema/user.schema");
const Quiz = require("../schema/quiz.schema");

const AnalyticsService = {
    getDashboardAnalytics: async (interval) => {
        try {
            // Set date range based on the interval
            const now = new Date();
            let startDate;

            switch (interval) {
                case "hourly":
                    startDate = new Date(now.getTime() - 1000 * 60 * 60);
                    break;
                case "daily":
                    startDate = new Date(now.getTime() - 1000 * 60 * 60 * 24);
                    break;
                case "monthly":
                    startDate = new Date(
                        now.getTime() - 1000 * 60 * 60 * 24 * 30
                    );
                    break;
                case "yearly":
                    startDate = new Date(
                        now.getTime() - 1000 * 60 * 60 * 24 * 365
                    );
                    break;
                default:
                    startDate = new Date(0); // default to all time if no interval is provided
            }

            // Get total users count
            const totalUsers = await User.countDocuments({});

            // Get total quizzes count
            const totalQuizzes = await Quiz.countDocuments({});

            // Get total average quiz score within the specified interval
            const totalQuizAverageScoreResult = await QuizResult.aggregate([
                { $match: { createdAt: { $gte: startDate } } },
                { $group: { _id: null, averageScore: { $avg: "$score" } } },
            ]);
            const totalAnswerAverageScore =
                totalQuizAverageScoreResult[0]?.averageScore || 0;

            // Get overall total participants count within the specified interval
            const totalParticipantsResult = await QuizResult.aggregate([
                { $match: { createdAt: { $gte: startDate } } },
                { $group: { _id: null, totalParticipants: { $sum: 1 } } },
            ]);
            const totalParticipants =
                totalParticipantsResult[0]?.totalParticipants || 0;

            // Get individual quiz details within the specified interval
            const quizzes = await Quiz.find({});
            const quizDetails = await Promise.all(
                quizzes.map(async (quiz) => {
                    const results = await QuizResult.find({
                        quizId: quiz._id,
                        createdAt: { $gte: startDate },
                    });

                    const scores = results.map((r) => r.score);
                    const totalScore = scores.reduce(
                        (acc, score) => acc + score,
                        0
                    );
                    const averageScore = totalScore / scores.length || 0;
                    const highestScore =
                        scores.length > 0 ? Math.max(...scores) : 0;
                    const lowestScore =
                        scores.length > 0 ? Math.min(...scores) : 0;

                    // Calculate median score
                    const sortedScores = scores.sort((a, b) => a - b);
                    const medianScore =
                        scores.length % 2 === 0
                            ? (sortedScores[scores.length / 2 - 1] +
                                  sortedScores[scores.length / 2]) /
                              2
                            : sortedScores[Math.floor(scores.length / 2)];

                    // Calculate standard deviation
                    const mean = averageScore;
                    const variance =
                        scores.reduce(
                            (acc, score) => acc + Math.pow(score - mean, 2),
                            0
                        ) / scores.length;
                    const standardDeviation = Math.sqrt(variance);

                    // Get question count for the quiz
                    const questionCount = quiz.questions.length;

                    // Get total participants for the quiz
                    const totalParticipants = results.length;

                    return {
                        _id: quiz._id,
                        title: quiz.title,
                        averageScore,
                        highestScore,
                        lowestScore,
                        medianScore,
                        standardDeviation,
                        totalParticipants,
                        questionCount,
                    };
                })
            );

            return {
                totalUsers,
                totalQuizzes,
                totalAnswerAverageScore,
                totalParticipants,
                quizDetails,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = AnalyticsService;
