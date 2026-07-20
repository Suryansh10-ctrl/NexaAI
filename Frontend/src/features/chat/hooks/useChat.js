import { useDispatch } from "react-redux";

import {
    createnewChat,
    addnewMessage,
    addMessage,
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    replaceLastMessage,
    resetCurrentChat,
} from "../chatSlice";

import {
    sendMessages,
    getChats,
    getMessages,
} from "../service/chat.api";

import { initialzeSocketConnection } from "../service/chat.socket";

export const useChat = () => {
    const dispatch = useDispatch();

    // ================= SEND MESSAGE =================

    async function handleSendMessages({ message, chatId, file = null }) {
    try {
        dispatch(setLoading(true));

        let activeChatId = chatId;

        // ================= NEW CHAT =================
        if (!chatId) {

            const data = await sendMessages({
                message,
                chatId: null,
                file,
            });

            if (!data.chat) {
                throw new Error("Chat not returned from backend");
            }

            activeChatId = data.chat._id;

            dispatch(
                createnewChat({
                    chatId: activeChatId,
                    title: data.chat.title,
                })
            );

            dispatch(setCurrentChatId(activeChatId));

            // User message from backend
            dispatch(
                addnewMessage({
                    chatId: activeChatId,
                    ...data.userMessage,
                })
            );

            // Assistant message
            dispatch(
                addnewMessage({
                    chatId: activeChatId,
                    ...data.aiMessage,
                })
            );

            return;
        }

        // ================= EXISTING CHAT =================

        // Show user instantly
        dispatch(
            addnewMessage({
                chatId: activeChatId,
                role: "user",
                content: message,
                file: file
                    ? {
                          name: file.name,
                          size: file.size,
                          type: file.type,
                      }
                    : null,
            })
        );

        // Show thinking animation
        dispatch(
            addnewMessage({
                chatId: activeChatId,
                role: "assistant",
                content: "",
                loading: true,
            })
        );

        const data = await sendMessages({
            message,
            chatId: activeChatId,
            file,
        });

        dispatch(
            replaceLastMessage({
                chatId: activeChatId,
                content: data.aiMessage.content,
            })
        );

    } catch (err) {
        console.error(err);

        dispatch(
            setError(
                err.response?.data?.message || err.message
            )
        );
    } finally {
        dispatch(setLoading(false));
    }
}

    async function handleGetMessages() {
        try {
            dispatch(setLoading(true));

            const data = await getChats();

            const formattedChats = data.chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    chatId: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updatedAt,
                };

                return acc;
            }, {});

            dispatch(setChats(formattedChats));

        } catch (err) {
            console.error(err);

            dispatch(
                setError(
                    err.response?.data?.message || err.message
                )
            );
        } finally {
            dispatch(setLoading(false));
        }
    }

    // ================= OPEN CHAT =================

    async function handleopenChat(chatId) {
        try {
            if (!chatId) return;

            dispatch(setLoading(true));

            const data = await getMessages(chatId);

            const formattedMessages = data.messages.map((message) => ({
                _id: message._id,
                chatId,
                role: message.role,
                content: message.content,
                file: message.file,
            }));

            dispatch(
                addMessage({
                    chatId,
                    messages: formattedMessages,
                })
            );

            dispatch(setCurrentChatId(chatId));

        } catch (err) {
            console.error(err);

            dispatch(
                setError(
                    err.response?.data?.message || err.message
                )
            );
        } finally {
            dispatch(setLoading(false));
        }
    }

    // ================= NEW CHAT =================

    function handleNewChat() {
        dispatch(resetCurrentChat());
    }

    return {
        initialzeSocketConnection,
        handleSendMessages,
        handleGetMessages,
        handleopenChat,
        handleNewChat,
    };
};