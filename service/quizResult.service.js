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

    getResults: async (query) => {
        try {
            const {
                userId,
                quizId,
                sortBy = "createdAt",
                sortOrder = "asc",
                limit = 10,
                page = 1,
            } = query;
            let filterQuery = {};

            if (userId) {
                filterQuery.userId = userId;
            }
            if (quizId) {
                filterQuery.quizId = quizId;
            }

            const results = await QuizResult.find(filterQuery)
                .populate("quizId userId")
                .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(parseInt(limit));

            const count = await QuizResult.countDocuments(filterQuery);

            return {
                results,
                count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
            };
        } catch (error) {
            throw error;
        }
    },
};

module.exports = QuizResultService;
