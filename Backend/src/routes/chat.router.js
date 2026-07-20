import { Router } from "express";
import { deleteChats, getChats, getMessages, sendMessage } from "../controller/chat.controller.js";
import { authUser } from "../midddleware/auth.middleware.js";
import { logout } from "../controller/auth.controller.js";
import { upload } from "../midddleware/upload.middleware.js";

const chatRouter = Router();


chatRouter.post('/message', authUser, upload.single("file"),sendMessage)

chatRouter.post("/message", authUser, sendMessage)

chatRouter.get("/", authUser, getChats)


chatRouter.get("/message/:chatId", authUser, getMessages)

chatRouter.delete("/delete/:chatId",authUser,deleteChats)



export default chatRouter