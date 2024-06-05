const QuizResultController = require("../../controller/quizResultController");

const router = require("express").Router();

// Submit quiz result
router.post("/", QuizResultController.submitResult);

// Get quiz results by user
router.get(
    "/user/:userId",

    QuizResultController.getResultsByUser
);

// Get quiz results by quiz
router.get(
    "/quiz/:quizId",

    QuizResultController.getResultsByQuiz
);

// Get aggregated quiz results
router.get(
    "/aggregate/:quizId",

    QuizResultController.getAggregatedResults
);

module.exports = router;
