const LeaderBoardController = require("../../controller/leaderboardController");
const checkPermission = require("../../middleware/tokenManager/checkPermission");

const router = require("express").Router();

// Get leaderBoard
router.get("/", checkPermission, LeaderBoardController.getLeaderBoard);

module.exports = router;
