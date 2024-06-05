const QuizResult = require("../schema/quizResult.schema");
const Quiz = require("../schema/quiz.schema");

const QuizResultService = {
    submitResult: async (resultData) => {
        const { userId, quizId, answers } = resultData;

        // Fetch the quiz
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            throw new Error("Quiz not found!");
        }

        // Calculate the score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correct_option === answers[index]) {
                score += 1;
            }
        });

        // Create a new quiz result
        const newResult = new QuizResult({ userId, quizId, score });
        const savedResult = await newResult.save();

        notifyAnalyticsUpdate();

        return savedResult;
    },

    getResultsByUser: async (userId) => {
        try {
            const results = await QuizResult.find({ userId: userId }).populate(
                "quizId"
            );
            return results;
        } catch (error) {
            throw error;
        }
    },

    getResultsByQuiz: async (quizId) => {
        try {
            const results = await QuizResult.find({ quizId: quizId }).populate(
                "userId"
            );
            return results;
        } catch (error) {
            throw error;
        }
    },

    getAggregatedResults: async (quizId, interval) => {
        try {
            const results = await QuizResult.aggregate([
                { $match: { quizId: quizId } },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: interval,
                                date: "$timestamp",
                            },
                        },
                        averageScore: { $avg: "$score" },
                        totalScore: { $sum: "$score" },
                        count: { $sum: 1 },
                    },
                },
            ]);
            return results;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = QuizResultService;
