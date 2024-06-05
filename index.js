const http = require("http");
const { wss } = require("./wsServer"); // Import the WebSocket server instance
const app = require("./app");
const port = process.env.PORT || 8000;

const server = http.createServer(app);

// Integrate WebSocket server with the HTTP server
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
