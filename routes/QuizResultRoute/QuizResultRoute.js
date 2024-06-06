const router = require("express").Router();
const QuizResultController = require("../../controller/quizResultController");
const checkUserToken = require("../../middleware/tokenManager/checkUserToken");
const checkPermission = require("../../middleware/tokenManager/checkPermission");

// Submit quiz result
router.post("/", checkUserToken, QuizResultController.submitResult);

// Get quiz results
router.get("/results", checkPermission, QuizResultController.getResults);

module.exports = router;
