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
            const { userId, quizId } = query;
            let results;

            if (userId) {
                results = await QuizResult.find({ userId: userId }).populate(
                    "quizId"
                );
            } else if (quizId) {
                results = await QuizResult.find({ quizId: quizId }).populate(
                    "userId"
                );
            } else {
                throw new Error("userId or quizId is required");
            }

            return results;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = QuizResultService;
