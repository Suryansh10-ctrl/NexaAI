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
        <div className="flex-1 flex items-center justify-center px-6">

            <div className="w-full max-w-3xl">

                <h1 className="text-5xl font-light text-white text-center">
                    Hello {"there !!"}
                </h1>

                <p className="text-zinc-400 text-center mt-4 mb-10 text-lg">
                    Where should we begin?
                </p>

                {selectedFile && (
                    <div className="mb-4 rounded-2xl border border-zinc-700 bg-[#2b2b2b] px-4 py-3 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="text-2xl">
                                📄
                            </div>

                            <div>

                                <p className="text-white">
                                    {selectedFile.name}
                                </p>

                                <p className="text-xs text-zinc-400">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={() => setSelectedFile(null)}
                            className="text-red-400"
                            type="button"
                        >
                            ✕
                        </button>

                    </div>
                )}

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
                        rounded-full
                        border
                        border-zinc-700
                        flex
                        items-center
                        px-4
                        py-2
                    "
                >

                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFile}
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-zinc-400 hover:text-white"
                    >
                        <Plus size={20}/>
                    </button>

                    <input
                        value={chatInput}
                        onChange={(e)=>setchatInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="
                            flex-1
                            bg-transparent
                            outline-none
                            px-4
                            text-white
                            placeholder:text-zinc-500
                        "
                    />

                    <button
                        type="button"
                        className="text-zinc-400 hover:text-white mr-3"
                    >
                        <Mic size={18}/>
                    </button>

                    <button
                        type="submit"
                        className="
                            bg-white
                            rounded-full
                            p-2
                            hover:scale-105
                            transition
                        "
                    >
                        <ArrowUp
                            size={16}
                            className="text-black"
                        />
                    </button>

                </form>

            </div>

        </div>
    );
};

export default WelcomeScreen;