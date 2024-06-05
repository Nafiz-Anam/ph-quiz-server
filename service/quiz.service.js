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

    getQuizzes: async () => {
        try {
            const quizzes = await Quiz.find();
            return quizzes;
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
