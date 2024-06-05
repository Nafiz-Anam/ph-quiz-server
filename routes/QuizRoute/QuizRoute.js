const router = require("express").Router();
const QuizController = require("../../controller/quiz.controller");
const checkAdminToken = require("../../middleware/tokenmanager/checkAdminToken");

// Create a new quiz
router.post("/", checkAdminToken, QuizController.createQuiz);

// Get all quizzes
router.get("/", checkAdminToken, QuizController.getQuizzes);

// Get a single quiz by ID
router.get("/:quizId", checkAdminToken, QuizController.getQuizById);

// Update a quiz by ID
router.put("/:quizId", checkAdminToken, QuizController.updateQuiz);

// Delete a quiz by ID
router.delete("/:quizId", checkAdminToken, QuizController.deleteQuiz);

module.exports = router;
