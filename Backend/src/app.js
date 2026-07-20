import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.router.js";

const app = express();

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// React routes
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;