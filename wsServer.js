const { WebSocketServer } = require("ws");
const AnalyticsService = require("./service/analytics.service");

const wss = new WebSocketServer({ noServer: true }); // Create WebSocket server without starting it

const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

wss.on("connection", (ws) => {
    console.log("WebSocket connected");

    notifyActiveUsersUpdate();

    ws.on("close", () => {
        console.log("WebSocket disconnected");
        notifyActiveUsersUpdate();
    });
});

const notifyAnalyticsUpdate = async () => {
    try {
        const intervals = ["hourly", "daily", "monthly", "yearly"];
        const analyticsData = {};

        for (const interval of intervals) {
            analyticsData[interval] =
                await AnalyticsService.getDashboardAnalytics(interval);
        }

        broadcast({ type: "analyticsUpdate", payload: analyticsData });
    } catch (error) {
        console.error("Error broadcasting analytics update:", error);
    }
};

const notifyActiveUsersUpdate = () => {
    const activeUsersCount = wss.clients.size;
    console.log("activeUsersCount", activeUsersCount);
    broadcast({ type: "activeUsersUpdate", payload: { activeUsersCount } });
};

module.exports = { wss, notifyAnalyticsUpdate, notifyActiveUsersUpdate };
