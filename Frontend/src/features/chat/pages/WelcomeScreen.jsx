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
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-4xl">

        {/* Heading */}
        <h1 className="text-center text-white font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Hello there!!
        </h1>

        <p className="text-center text-zinc-400 mt-3 sm:mt-4 mb-8 sm:mb-10 text-base sm:text-lg">
          Where should we begin?
        </p>

        {/* Selected File */}
        {selectedFile && (
          <div className="mb-4 rounded-2xl border border-zinc-700 bg-[#2b2b2b] px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="text-2xl shrink-0">📄</div>

              <div className="overflow-hidden">
                <p className="text-white truncate">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-zinc-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="text-red-400 hover:text-red-300 shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* Chat Form */}
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
            w-full
            rounded-3xl
            border
            border-zinc-700
            bg-[#2b2b2b]
            px-3
            py-2
            flex
            items-center
            gap-2
            sm:gap-3
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
            className="text-zinc-400 hover:text-white p-2 rounded-full transition"
          >
            <Plus size={20} />
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
              text-white
              placeholder:text-zinc-500
              text-sm
              sm:text-base
              min-w-0
            "
          />

          {/* Mic */}
          <button
            type="button"
            className="text-zinc-400 hover:text-white p-2 rounded-full transition"
          >
            <Mic size={18} />
          </button>

          {/* Send */}
          <button
            type="submit"
            className="
              bg-white
              rounded-full
              p-2.5
              hover:scale-105
              transition
              shrink-0
            "
          >
            <ArrowUp
              size={16}
              className="text-black"
            />
          </button>
        </form>

        {/* Mobile Hint */}
        <p className="text-center text-xs text-zinc-500 mt-4 sm:hidden">
          Tap + to upload a file
        </p>

      </div>
    </div>
  );
};

export default WelcomeScreen;