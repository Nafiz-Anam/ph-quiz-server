const router = require("express").Router();
const QuizResultController = require("../../controller/quizResultController");
const checkUserToken = require("../../middleware/tokenmanager/checkUserToken");

// Submit quiz result
router.post("/", checkUserToken, QuizResultController.submitResult);

// Get quiz results by user
router.get("/results/:userId", QuizResultController.getResults);

module.exports = router;
