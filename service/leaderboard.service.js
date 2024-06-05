const QuizResult = require("../schema/quizResult.schema");

const LeaderBoardService = {
    getLeaderBoard: async () => {
        const leaderBoard = await QuizResult.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalScore: { $sum: "$score" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 1,
                    totalScore: 1,
                    "user.full_name": 1,
                },
            },
            { $sort: { totalScore: -1 } },
            { $limit: 10 },
        ]);
        return leaderBoard;
    },
};

module.exports = LeaderBoardService;
