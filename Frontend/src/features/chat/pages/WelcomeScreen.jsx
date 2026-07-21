import React, { useRef, useState } from "react";
import { Plus, Mic, ArrowUp } from "lucide-react";

const WelcomeScreen = ({
    user,
    chatInput,
    setchatInput,
    handleSubmitMessage,
}) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedFile(file);
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">

            <div className="w-full max-w-4xl">

                {/* Heading */}

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white text-center">
                    Hello there !!
                </h1>

                <p className="text-zinc-400 text-center mt-3 sm:mt-4 mb-8 sm:mb-10 text-base sm:text-lg">
                    Where should we begin?
                </p>

                {/* Selected File */}

                {selectedFile && (
                    <div className="mb-4 rounded-2xl border border-zinc-700 bg-[#2b2b2b] px-4 py-3 flex items-center justify-between">

                        <div className="flex items-center gap-3 overflow-hidden">

                            <div className="text-2xl shrink-0">
                                📄
                            </div>

                            <div className="overflow-hidden">

                                <p className="text-white truncate text-sm sm:text-base">
                                    {selectedFile.name}
                                </p>

                                <p className="text-xs text-zinc-400">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() => setSelectedFile(null)}
                            className="text-red-400 hover:text-red-300 ml-4"
                            type="button"
                        >
                            ✕
                        </button>

                    </div>
                )}

                {/* Form */}

                <form
                    onSubmit={(e) =>
                        handleSubmitMessage(e, selectedFile, setSelectedFile)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();

                        if (e.dataTransfer.files.length > 0) {
                            setSelectedFile(e.dataTransfer.files[0]);
                        }
                    }}
                    className="
                        bg-[#2b2b2b]
                        border
                        border-zinc-700
                        rounded-2xl
                        sm:rounded-full
                        flex
                        items-center
                        px-3
                        sm:px-4
                        py-2
                    "
                >

                    {/* Hidden File Input */}

                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={handleFile}
                    />

                    {/* Upload */}

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-zinc-400 hover:text-white transition"
                    >
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Input */}

                    <input
                        value={chatInput}
                        onChange={(e) => setchatInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="
                            flex-1
                            bg-transparent
                            outline-none
                            px-3
                            sm:px-4
                            text-sm
                            sm:text-base
                            text-white
                            placeholder:text-zinc-500
                        "
                    />

                    {/* Mic */}

                    <button
                        type="button"
                        className="text-zinc-400 hover:text-white transition mr-2 sm:mr-3"
                    >
                        <Mic className="w-5 h-5" />
                    </button>

                    {/* Send */}

                    <button
                        type="submit"
                        className="
                            bg-white
                            rounded-full
                            p-2
                            hover:scale-105
                            transition
                            shrink-0
                        "
                    >
                        <ArrowUp
                            className="text-black w-4 h-4 sm:w-5 sm:h-5"
                        />
                    </button>

                </form>

                {/* Mobile Hint */}

                <p className="text-center text-xs text-zinc-500 mt-5 sm:hidden">
                    You can also drag & drop files here.
                </p>

            </div>

        </div>
    );
};

export default WelcomeScreen;