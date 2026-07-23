import dotenv from "dotenv"
dotenv.config()

import dns from "dns"
dns.setServers(["8.8.8.8"]);



import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import http from "http"

import { testAI } from "./src/services/ai.service.js";
import { initSocket } from "./src/socket/server.socket.js";

const httpServer = http.createServer(app)
initSocket(httpServer)



connectDB();
testAI();

httpServer.listen(3000, () => {
    console.log("port is running at 3000")
})