import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        createnewChat: (state,action) => {
            const {chatId,title} = action.payload
            state.chats[chatId] = {
                chatId,
                title: title,
                messages: [],
                users: [],
                lastUpdated: new Date().toISOString(),
                
            }
        },
        addnewMessage: (state, action) => {
            const { chatId, ...message } = action.payload;

            if (!state.chats[chatId]) {
                console.error("Chat not found:", chatId);
                return;
            }

            state.chats[chatId].messages.push(message);
        },
        addMessage: (state, action) => {
            const { chatId, messages } = action.payload;

            if (!state.chats[chatId]) return;

            state.chats[chatId].messages = messages;
        },
        setChats: (state,action) => {
            state.chats = action.payload;
        },
        setCurrentChatId: (state,action) => {
            state.currentChatId = action.payload;
        },
        setLoading: (state,action) => {
            state.isLoading = action.payload;
        },
        setError: (state,action) => {
            state.error = action.payload;
        },
        replaceLastMessage: (state, action) => {
            const { chatId, content } = action.payload;

            if (!state.chats[chatId]) return;

            const messages = state.chats[chatId].messages;

            if (!messages.length) return;

            messages[messages.length - 1] = {
                role: "assistant",
                content,
                loading: false,
            };
        },
        resetCurrentChat: (state) => {
            state.currentChatId = null;
        },
    }
})


export const {createnewChat,addnewMessage,addMessage,setChats,setCurrentChatId,setLoading,setError,replaceLastMessage,resetCurrentChat} = chatSlice.actions;
export default chatSlice.reducer;


