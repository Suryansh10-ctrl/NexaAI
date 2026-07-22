import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import WelcomeScreen from "./WelcomeScreen";
import MarkdownRenderer from "../components/MarkdownRender";
import { useNavigate } from "react-router-dom";

import {
    PanelLeftClose,
    PanelLeftOpen,
    SquarePen,
    Search,
    Library,
    MessageSquare,
    Settings,
    CircleUserRound,
    Mic,
    ArrowUp,
    Plus,
    LoaderCircle,
    LogOut
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

const chats = [
    "React Socket.io",
    "Authentication",
    "Tailwind Dashboard",
    "Node.js Notes App",
    "GenAI Project",
];

const Dashboard = () => {
    const {
        initialzeSocketConnection,
        handleGetMessages,
        handleSendMessages,
        handleopenChat,
        handleNewChat,
        state,
        action,
        chat,
    } = useChat();

    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [chatInput, setchatInput] = useState("");
    const [isSidebarOpen, setisSidebarOpen] = useState(false)
    const [search, setSearch] = useState("");

    const { user } = useSelector((state) => state.auth);
    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId);

    const filteredChats = Object.values(chats)
        .sort(
            (a, b) =>
                new Date(b.lastUpdated) - new Date(a.lastUpdated)
        )
        .filter(chat =>
            chat.title.toLowerCase().includes(search.toLowerCase())
        );

    const currentMessage =
        chats[currentChatId]?.messages || [];

    const showWelcomeScreen =
        !currentChatId || currentMessage.length === 0;
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };
    const SearchRef = useRef(null);


    const chatContainerRef = useRef(null);
    const currentMessages = chats[currentChatId]?.messages || [];
    useEffect(() => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        });
    }, [currentMessages]);

    useEffect(() => {
        initialzeSocketConnection();
        handleGetMessages()
    }, []);

    const handleSubmitMessage = async (
        e,
        file = selectedFile,
        clearFile = null
    ) => {
        e.preventDefault();

        if (!chatInput.trim() && !file) return;

        try {
            await handleSendMessages({
                message: chatInput,
                chatId: currentChatId,
                file,
            });

            setchatInput("");
            setSelectedFile(null);

            if (clearFile) {
                clearFile(null);
            }

        } catch (err) {
            console.log(err);
        }
    };
    const openChat = (chatId) => {
        handleopenChat(chatId)
        if (window.innerWidth < 1024) {
            setisSidebarOpen(false);
        }
    }

    useEffect(() => {
        const handler = (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                SearchRef.current.focus();
            }
        }
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);



    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        console.log(file);
    };

    return (
        <main className="h-dvh w-full bg-[#212121] flex overflow-hidden">
            {isSidebarOpen && (
                <div
                    onClick={() => setisSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* side bar */}
            <aside
                className={`
                        fixed lg:static
                        top-0 left-0
                        h-screen
                        z-50
                        bg-[#171717]
                        border-r border-zinc-800
                        flex flex-col
                        transition-all duration-300
                        ${isSidebarOpen
                        ? "translate-x-0 w-[280px] max-w-[85vw]"
                        : "-translate-x-full lg:translate-x-0 lg:w-20"
                    }
                    `}
            >
                {/* Header */}

                <div className="p-4 flex items-center justify-between">

                    {isSidebarOpen &&
                        <div className="flex items-center gap-3">
                            {/* <button
                                onClick={() => setisSidebarOpen(true)}
                                className="lg:hidden text-white"
                            >
                                <PanelLeftOpen size={22}/>
                            </button> */}

                            <h1 className="text-lg lg:text-xl text-gray-300 font-serif">
                                NexaAI
                            </h1>
                        </div>
                    }

                    <button
                        onClick={() => setisSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition cursor-pointer">
                        <PanelLeftClose size={20}
                            className={`transition-transform duration-300 text-white ${isSidebarOpen ? "rotate-180" : ""}`}
                        />
                    </button>


                </div>

                {/* Navigation */}
                <div className="px-3 space-y-1">
                    <div className="flex items-center bg-[#262626] rounded-xl px-3 py-2">

                        <Search
                            size={18}
                            className="text-zinc-400"
                        />

                        {isSidebarOpen && (

                            <input
                                ref={SearchRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search chats..."
                                className="
                                flex-1
                                bg-transparent
                                outline-none
                                ml-3
                                text-sm
                                text-white
                                placeholder:text-zinc-500
                                "
                            />

                        )}

                    </div>

                    {filteredChats.length === 0 && (

                        <div className="text-center mt-10 text-zinc-500">

                            No chats found

                        </div>

                    )}


                    <button onClick={(() => {
                        handleNewChat()
                        if (window.innerWidth < 1024) {
                            setisSidebarOpen(false)
                        }
                        setchatInput("")
                    })}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition text-white cursor-pointer">
                        <SquarePen size={18} />
                        {isSidebarOpen && <span>New Chat</span>}
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition text-white cursor-pointer">
                        <Library size={18} />
                        {isSidebarOpen && <span>Library</span>}
                    </button>


                </div>

                {/* Recent Chats */}
                <div className="flex-1 overflow-y-auto px-3 mt-6">
                    {isSidebarOpen && <p className="text-xs uppercase text-zinc-500 px-3 mb-3">
                        Recent Chats
                    </p>}

                    <div className="space-y-1">
                        {filteredChats.map((chat, index) => (


                            <button
                                onClick={() => openChat(chat.chatId)}
                                key={chat.chatId || index}
                                className={`

                                w-full
                                flex
                                items-center
                                px-3
                                py-2
                                rounded-lg
                                transition

                                ${currentChatId === chat.chatId
                                        ? "bg-zinc-800 text-white"
                                        : "hover:bg-zinc-800 text-zinc-300"
                                    }

                            `}
                            >
                                {isSidebarOpen && chat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-zinc-800 p-3 space-y-2">


                    <button
                        className={`
                            w-full
                            flex
                            items-center
                            rounded-xl
                            py-2
                            transition
                            cursor-pointer
                            hover:bg-zinc-800
                            ${isSidebarOpen
                                ? "gap-3 px-3 justify-start"
                                : "justify-center"
                            }`}
                    >
                        <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                            <span className="text-lg font-semibold text-white">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        {isSidebarOpen && (
                            <div className="text-left overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-zinc-500 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        )}
                    </button>

                    <button
                        onClick={async () => {
                            await handleLogout();
                            navigate("/login");
                        }}
                        className={`
                            w-full
                            flex
                            items-center
                            rounded-xl
                            py-2
                            text-white
                            transition
                            hover:text-red-400
                            ${isSidebarOpen
                                ? "gap-3 px-4.75 justify-start"
                                : "justify-center"
                            }
                        `}
                    >
                        <LogOut size={20} />

                        {isSidebarOpen && (
                            <span>Logout</span>
                        )}
                    </button>

                </div>

            </aside>

            {/* ================= Chat Area ================= */}

            <section className="flex-1 min-w-0 flex flex-col overflow-hidden bg-[#171717]">

                {/* Header */}
                <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-3 sm:px-5">
                    <button
                        onClick={() => setisSidebarOpen(true)}
                        className="lg:hidden text-white"
                    >
                        <PanelLeftOpen size={22} />
                    </button>
                    <h1 className="text-xl text-gray-300 font-serif hover:text-gray-500 transition cursor-pointer">
                        NexaAI
                    </h1>
                </header>

                {showWelcomeScreen ? (

                    <WelcomeScreen
                        user={user}
                        chatInput={chatInput}
                        setchatInput={setchatInput}
                        handleSubmitMessage={handleSubmitMessage}
                        isSidebarOpen={isSidebarOpen}
                    />

                ) : (

                    <>
                        {/* Messages */}

                        <div
                            className="messages flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-5 py-4 "
                        >
                            <div className="max-w-4xl mx-auto space-y-6">

                                {currentMessages.map((message, index) => (

                                    <div
                                    className={`flex items-start gap-2 ${
                                    message.role==="user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                                    >

                                        {/* AI Avatar */}

                                        {message.role === "assistant" && (

                                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-semibold mr-3 shrink-0">

                                                AI

                                            </div>

                                        )}

                                        {/* Bubble */}

                                        <div
                                            className={`max-w[calc(100%-48px)] sm:max-w-[75%] md:max-w-[80%] w-fit rounded-xl px-3 py-3 overflow-hidden shadow-lg ${message.role === "user"
                                                    ? "bg-[#232222] text-white rounded-br-md border border-gray-700"
                                                    : "bg-[#232222] text-white rounded-bl-md border border-gray-700"
                                                }`}
                                        >

                                            {message.loading ? (

                                                <div className="flex items-center gap-2">

                                                    <div className="flex items-center gap-2 py-2">
                                                        <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                                                        <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-150"></div>
                                                        <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-300"></div>
                                                    </div>

                                                </div>

                                            ) : (

                                                <article
                                                    className="
                                                        prose
                                                        prose-invert
                                                        max-w-none

                                                        prose-headings:mb-4
                                                        prose-headings:mt-8
                                                        prose-headings:text-white

                                                        prose-p:my-4
                                                        prose-p:leading-8

                                                        prose-ul:my-4
                                                        prose-ul:pl-6
                                                        prose-li:my-2

                                                        prose-ol:my-4
                                                        prose-ol:pl-6

                                                        prose-table:my-6

                                                        prose-pre:bg-[#181818]
                                                        prose-pre:border
                                                        prose-pre:border-zinc-700

                                                        prose-code:text-green-400

                                                        break-words
                                                        overflow-hidden

                                                        prose-pre:overflow-x-auto
                                                        prose-pre:max-w-full

                                                        prose-code:break-all

                                                        prose-table:block
                                                        prose-table:overflow-x-auto
                                                    "
                                                >

                                                    {message.file && (
                                                        <a
                                                            href={`http://localhost:3000${message.file.url}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mb-3 flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 p-3 hover:bg-zinc-700 transition cursor-pointer"
                                                        >
                                                            <div className="text-2xl">📄</div>

                                                            <div className="flex-1 overflow-hidden">
                                                                <p className="text-sm text-white truncate">
                                                                    {message.file.name}
                                                                </p>

                                                                <p className="text-xs text-zinc-400">
                                                                    {(message.file.size / 1024).toFixed(1)} KB
                                                                </p>
                                                            </div>

                                                            <div className="text-blue-400 text-sm">
                                                                Open ↗
                                                            </div>
                                                        </a>
                                                    )}

                                                    <MarkdownRenderer >
                                                        {message.content}
                                                    </MarkdownRenderer>
                                                </article>

                                            )}

                                        </div>

                                        {/* User Avatar */}

                                        {message.role === "user" && (

                                            <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold ml-3 shrink-0">

                                                U

                                            </div>

                                        )}

                                    </div>

                                ))}

                                <div ref={messagesEndRef} />

                            </div>

                        </div>

                        {/* Bottom Input */}

                        <div className="px-2 sm:px-4 lg:px-6 pb-4">

                            {selectedFile && (
                                <div className="w-full max-w-4xl mx-auto mb-3 bg-[#2b2b2b] border border-zinc-700 rounded-2xl px-4 py-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-lg">
                                            📄
                                        </div>

                                        <div className="overflow-hidden">
                                            <p className="text-sm text-white truncate">
                                                {selectedFile.name}
                                            </p>

                                            <p className="text-xs text-zinc-400">
                                                {(selectedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedFile(null)}
                                        className="text-zinc-400 hover:text-red-400 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmitMessage}
                                onDragOver={(e => { e.preventDefault() })}
                                onDrop={(e) => {
                                    e.preventDefault();

                                    if (e.dataTransfer.files.length > 0) {
                                        setSelectedFile(e.dataTransfer.files[0]);
                                    }
                                }}
                                className="
                                w-full
                                max-w-4xl
                                mx-auto
                                bg-[#2b2b2b]
                                border
                                border-zinc-700
                                rounded-full
                                px-2 md:px-4 py-2
                                flex
                                items-center
                                overflow-hidden
                                "
                            >

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    ref={fileInputRef}
                                    onChange={handleFile}
                                />

                                {/* Upload button */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="text-zinc-400 hover:text-white"
                                >
                                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                                </button>

                                {/* Chat input */}
                                <input
                                    value={chatInput}
                                    onChange={(e) => setchatInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="
                                        flex-1
                                        min-w-0
                                        bg-transparent
                                        outline-none
                                        px-3 md:px-4
                                        text-sm md:text-base
                                        text-white
                                        placeholder:text-zinc-500
                                        "
                                />

                                {/* Mic button */}
                                <button
                                    type="button"
                                    className="text-zinc-400 hover:text-white mr-3"
                                >
                                    <Mic size={18} />
                                </button>

                                {/* Send button */}
                                <button
                                    type="submit"
                                    className="
                                    bg-white
                                    text-black
                                    rounded-full
                                    p-2
                                    hover:scale-105
                                    transition
                                    "
                                >
                                    <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
                                </button>

                            </form>

                        </div>

                    </>

                )}

            </section>
        </main>
    );
};

export default Dashboard;