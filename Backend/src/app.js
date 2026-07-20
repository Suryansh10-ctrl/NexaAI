import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";
import cors from "cors"
import chatRouter from "./routes/chat.router.js";

const app = express();

app.use((req, res, next) => {
  req.url = req.url.replace(/\/{2,}/g, "/");
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter)

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

export default app;