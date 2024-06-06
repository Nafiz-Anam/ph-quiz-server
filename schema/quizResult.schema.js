const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quizId: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    score: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

module.exports = QuizResult;
