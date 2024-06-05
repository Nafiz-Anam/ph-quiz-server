const router = require("express").Router();
const AuthRouter = require("./AuthRoute/AuthRoute");
const UserRouter = require("./UserRoute/UserRoute");
const QuizRouter = require("./QuizRoute/QuizRoute");
const LeaderBoardRouter = require("./LeaderBoardRoute/LeaderBoardRoute");
const AnalyticsRouter = require("./AnalyticsRoute/AnalyticsRoute");
const QuizResultRouter = require("./QuizResultRoute/QuizResultRoute");

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/quiz", QuizRouter);
router.use("/quiz-result", QuizResultRouter);
router.use("/leaderboard", LeaderBoardRouter);
router.use("/analytics", AnalyticsRouter);

module.exports = router;
