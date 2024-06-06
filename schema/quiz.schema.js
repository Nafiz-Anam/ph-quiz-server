const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String, default: "", required: true },
    options: [{ type: String, default: "", required: true }],
    correct_option: { type: Number, default: "", required: true },
});

const quizSchema = new Schema({
    title: { type: String, default: "", required: true },
    questions: [questionSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
