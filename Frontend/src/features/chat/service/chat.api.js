import axios from "axios";

const api = axios.create({
    baseURL: "https://nexaai-mb5t.onrender.com",
    withCredentials: true,
});

export const sendMessages = async ({ message, chatId, file }) => {

    const formData = new FormData();

    formData.append("message", message);

    if (chatId) {
        formData.append("chatId", chatId);
    }

    if (file) {
        formData.append("file", file);
    }

    const response = await api.post(
        "/api/chats/message",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getChats = async () => {
    const response = await api.get("/api/chats");
    return response.data;
};

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chats/message/${chatId}`);
    return response.data;
};

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/${chatId}`);
    return response.data;
};