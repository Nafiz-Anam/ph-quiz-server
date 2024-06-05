const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

// database connection import
const { connectDB } = require("./config/database");

//route import
const Router_v1 = require("./routes/Router");

// express app
const app = express();

//middle-wares
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

// Connect to the database
connectDB();

// main api endpoint
app.use("/v1", Router_v1);

// default endpoint
app.get("/", (req, res) => {
    res.send("Welcome to Study Planner Api Server.");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong. Try again!");
});

module.exports = app;
