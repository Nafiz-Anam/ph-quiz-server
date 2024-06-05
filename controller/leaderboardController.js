const LeaderBoardService = require("../service/leaderboard.service");

var LeaderBoardController = {
    getLeaderBoard: async (req, res, next) => {
        try {
            const leaderBoard = await LeaderBoardService.getLeaderBoard();

            res.status(200).json({
                status: true,
                data: leaderBoard,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: error.message || "Internal server error!",
            });
        }
    },
};

module.exports = LeaderBoardController;
