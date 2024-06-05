const app = require("./app");
const wss = require("./wsServer");

const port = process.env.PORT || 8000;
const wsPort = process.env.WS_PORT || 8080;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

wss.on("listening", () => {
    console.log(`WebSocket server is listening on port ${wsPort}`);
});
