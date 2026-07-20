import { generateResponse,generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"
import mammoth from "mammoth";




export async function sendMessage(req, res) {
    console.time("Total Request");

    try {
        const { message, chatId } = req.body;
        const file = req.file;

        let finalMessage = message || "";

        // ================= FILE HANDLING =================

        if (file) {
            finalMessage += `

        Uploaded File Information
        -------------------------
        Name: ${file.originalname}
        Type: ${file.mimetype}
        Size: ${(file.size / 1024).toFixed(2)} KB

        `;

            // ---------- TXT ----------
            if (file.mimetype === "text/plain") {
                finalMessage += "\nFile Content:\n";
                finalMessage += file.buffer.toString("utf8");
            }

            // ---------- JSON ----------
            else if (file.mimetype === "application/json") {
                finalMessage += "\nJSON Content:\n";
                finalMessage += file.buffer.toString("utf8");
            }

            // ---------- DOCX ----------
           else if (
            file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({
                path: file.path,
            });

            finalMessage += "\nDocument Content:\n";
            finalMessage += result.value;
        }

            // ---------- OTHER FILES ----------
            else {
                finalMessage +=
                    "\nThis file type is currently not supported for text extraction.";
            }
        }

        // ================= CREATE / FIND CHAT =================

        let chat;
        let title;

        if (!chatId) {
            title = await generateChatTitle(finalMessage);

            chat = await chatModel.create({
                user: req.user.id,
                title,
            });
        } else {
            chat = await chatModel.findById(chatId);

            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found",
                });
            }

            chat.updatedAt = new Date();
            await chat.save();
        }

        // ================= SAVE USER MESSAGE =================

        const userMessage = await messageModel.create({
            chat: chat._id,
            sender: req.user.id,
            role: "user",
            content: message?.trim() || "",
            file: file
                ? {
                    name: file.originalname,
                    size: file.size,
                    type: file.mimetype,
                    url: `/uploads/${file.filename}`,
                }
                : null,
        });

        // ================= FETCH CHAT HISTORY =================

        const messages = await messageModel
            .find({ chat: chat._id })
            .sort({ createdAt: 1 });

        // ================= GEMINI =================

        const aiMessages = messages.map((msg) => {
            if (
                msg.role === "user" &&
                msg._id.toString() === messages[messages.length - 1]._id.toString()
            ) {
                return {
                    ...msg.toObject(),
                    content: finalMessage,
                };
            }

            return msg.toObject();
        });

        const aiResponse = await generateResponse(aiMessages);

        // ================= SAVE AI MESSAGE =================

        const aiMessage = await messageModel.create({
            chat: chat._id,
            sender: req.user.id,
            role: "assistant",
            content: aiResponse,
        });

        console.timeEnd("Total Request");

        return res.status(201).json({
            chat,
            userMessage,
            aiMessage,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: err.message,
        });
    }
}

export async function getChats(req,res){
    const user = req.user;

    const chats = await chatModel.find({
        user: user.id
    })

    res.status(200).json({
        message: "chat retrieved successfully",
        chats
    })
}

export async function getMessages(req,res) {
   const {chatId} = req.params;

   const chat = await messageModel.findOne({
    chat: chatId,
    sender: req.user.id
   }) 

   if(!chatId){
    return res.status(404).json({
        message: "Chat not found",
    })
   }

   const messages = await messageModel.find({
    chat: chatId
   })

   res.status(200).json({
    messages
   })


}

export async function deleteChats(req,res){
    const {chatId} = req.params;

    const chat  = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if(!chat){
        return res.status(409).json({
            message: "Chat not found",
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}