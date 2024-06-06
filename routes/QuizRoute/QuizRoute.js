const router = require("express").Router();
const QuizController = require("../../controller/quiz.controller");
const checkAdminToken = require("../../middleware/tokenManager/checkAdminToken");
const checkPermission = require("../../middleware/tokenManager/checkPermission");
const quizValidation = require("../../middleware/validations/quizValidation");

// Create a new quiz
router.post(
    "/",
    checkAdminToken,
    quizValidation.create,
    QuizController.createQuiz
);

// Get all quizzes
router.get(
    "/",
    checkPermission,
    quizValidation.list,
    QuizController.getQuizzes
);

// Get a single quiz by ID
router.get(
    "/:quizId",
    checkPermission,
    quizValidation.getById,
    QuizController.getQuizById
);

// Update a quiz by ID
router.put(
    "/:quizId",
    checkAdminToken,
    quizValidation.update,
    QuizController.updateQuiz
);

// Delete a quiz by ID
router.delete(
    "/:quizId",
    checkAdminToken,
    quizValidation.delete,
    QuizController.deleteQuiz
);

module.exports = router;
