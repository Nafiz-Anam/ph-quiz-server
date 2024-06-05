const LeaderBoardController = require("../../controller/leaderboardController");

const router = require("express").Router();

// Get leaderboard
router.get("/", LeaderBoardController.getLeaderBoard);

module.exports = router;
