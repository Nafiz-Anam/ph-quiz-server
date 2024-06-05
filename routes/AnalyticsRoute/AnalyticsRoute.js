const router = require("express").Router();
const AnalyticsController = require("../../controller/analyticsController");
const checkAdminToken = require("../../middleware/tokenmanager/checkAdminToken");

// Get analytics for a specific quiz
router.get("/", checkAdminToken, AnalyticsController.getDashboardAnalytics);

module.exports = router;
