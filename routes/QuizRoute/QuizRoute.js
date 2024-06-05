const router = require("express").Router();
const QuizController = require("../../controller/quiz.controller");

// Create a new quiz
router.post("/", QuizController.createQuiz);

// Get all quizzes
router.get("/", QuizController.getQuizzes);

// Get a single quiz by ID
router.get("/:quizId", QuizController.getQuizById);

// Update a quiz by ID
router.put("/:quizId", QuizController.updateQuiz);

// Delete a quiz by ID
router.delete("/:quizId", QuizController.deleteQuiz);

module.exports = router;
