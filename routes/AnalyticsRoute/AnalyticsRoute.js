const AnalyticsController = require("../../controller/analyticsController");

const router = require("express").Router();

// Get analytics for a specific quiz
router.get("/:quizId", AnalyticsController.getAnalytics);

module.exports = router;
