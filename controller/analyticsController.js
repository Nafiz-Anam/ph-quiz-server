const AnalyticsService = require("../service/analytics.service");

var AnalyticsController = {
    getDashboardAnalytics: async (req, res, next) => {
        try {
            const analytics = await AnalyticsService.getDashboardAnalytics();

            res.status(200).json({
                status: true,
                data: analytics,
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

module.exports = AnalyticsController;
