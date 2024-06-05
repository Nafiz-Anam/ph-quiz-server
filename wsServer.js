const { WebSocketServer } = require("ws");
const QuizResultService = require("./service/quizResult.service");
const LeaderboardService = require("./service/leaderboard.service");
const AnalyticsService = require("./service/analytics.service");

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
        const data = JSON.parse(message);

        if (data.type === "submitQuiz") {
            const { userId, quizId, answers } = data.payload;

            try {
                // Submit quiz result
                const newResult = await QuizResultService.submitResult({
                    userId,
                    quizId,
                    answers,
                });

                // Get updated leaderboard
                const leaderboard = await LeaderboardService.getLeaderBoard();

                // Get updated analytics for the specific quiz
                const analytics = await AnalyticsService.getAnalytics(quizId);

                // Broadcast updates to all connected clients
                wss.clients.forEach((client) => {
                    if (client.readyState === ws.OPEN) {
                        client.send(
                            JSON.stringify({
                                type: "update",
                                payload: {
                                    leaderboard,
                                    analytics,
                                },
                            })
                        );
                    }
                });

                // Send confirmation to the submitting client
                ws.send(
                    JSON.stringify({
                        status: true,
                        message: "Quiz result submitted successfully.",
                        data: newResult,
                    })
                );
            } catch (error) {
                console.error("Error processing message:", error);
                ws.send(
                    JSON.stringify({ status: false, message: error.message })
                );
            }
        }
    });

    ws.send("Welcome to real-time analytics!");
});

module.exports = wss;
