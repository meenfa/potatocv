"use client";

import { File, Upload, SaveAll   } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
interface RoastFormProps {
  resume: string;
  setResume: (value: string) => void;
  handleRoast: () => void;
  loading: boolean;
}

const MIN_RESUME_LENGTH = 100;

const RoastForm = ({
  resume,
  setResume,
  handleRoast,
  loading,
}: RoastFormProps) => {
  const [loadingMessage, setLoadingMessage] = useState("Preparing to roast...");
  const [messageIndex, setMessageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trimmedLength = resume.trim().length;
  const isValid = trimmedLength >= MIN_RESUME_LENGTH;
  const charsNeeded = MIN_RESUME_LENGTH - trimmedLength;
  const MAX_FILE_SIZE = 3 * 1024 * 1024;
  const loadingMessages = [
    "Reading your CV... trying not to laugh 🧐",
    "Detecting buzzwords... found too many 💀",
    "Counting how many times you wrote 'hardworking' 🥔",
    "Roasting in progress... please hold 🔥",
    "Finding your strengths... this may take a while 😬",
    "Consulting the potato gods... 🥔✨",
    "Almost done... brace yourself 😅",
    "Your CV has been seen. It cannot be unseen 👀",
  ];

  useEffect(() => {
    if (!loading) {
      setLoadingMessage("Preparing to roast...");
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        const next = (prev + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[next]);
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [loading]);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const contentType = res.headers.get("content-type") || "";
    const rawText = await res.text();

    if (!res.ok) {
      throw new Error("Try a different file or paste your CV instead.");
    }

    if (!contentType.includes("application/json")) {
      throw new Error("Something went wrong on our end. Try pasting your CV instead.");
    }

    const data = JSON.parse(rawText);

    if (!data?.text) {
      throw new Error("Could not read any text from this file. Try pasting your CV instead.");
    }

    return data.text;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;


    // File size check
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Please upload a file under 3MB. Your CV should not be that long! 🥔",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsExtracting(true);

    try {
      const text = await extractTextFromFile(file);
      setResume(text);
      setActiveTab("paste");
    }
    catch (error) {
      console.error("Error extracting file:", error);
      toast.error("Failed to extract text", {
        description:
          error instanceof Error ? error.message : "Unknown error. Try pasting instead!",
      });
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl">
      <div className="flex border-b border-[#C68642] mb-6">
        <button
          type="button"
          className={`px-4 py-2 font-semibold text-base sm:text-lg ${activeTab === "upload"
            ? "text-[#66421f] border-b-2 border-[#C68642]"
            : "text-gray-400"
            }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload PDF/DOCX
        </button>
        <button
          type="button"
          className={`px-4 py-2 font-semibold text-base sm:text-lg ${activeTab === "paste"
            ? "text-[#66421f] border-b-2 border-[#C68642]"
            : "text-gray-400"
            }`}
          onClick={() => setActiveTab("paste")}
        >
          Paste Text
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="mb-6 flex flex-col items-center justify-center border-4 border-dashed border-[#C68642] rounded-xl p-8 text-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="hidden"
          />
          {/* <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtracting}
            className={`bg-[#f2b055] text-[#66421f] px-6 py-3 rounded-xl font-bold text-base sm:text-lg mb-4 ${isExtracting ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isExtracting ? "Extracting Text..." : "Choose File"}
          </button> */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtracting}
            className={` text-[#66421f] px-6 py-3 rounded-xl font-bold text-base sm:text-lg mb-4 flex items-center gap-2 cursor-pointer ${isExtracting ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isExtracting ? (
              "Extracting Text..."
            ) : (
              <>
                <Upload size={52} />
                {/* <span>Upload Resume</span> */}
              </>
            )}
          </button>
          <p className="text-sm text-gray-500">PDF or DOCX only</p>
        </div>
      )}

      {activeTab === "paste" && (
        <div className="mb-6">
          <textarea
            placeholder="Copy-paste your CV content... Don't be shy, we've seen worse 😉"
            className="w-full h-40 p-4 rounded-xl border-4 border-dashed border-[#C68642] focus:outline-none focus:ring-0 focus:border-[#C68642] resize-none text-[#5a330d] placeholder:text-[#7a6b5c] text-sm sm:text-base bg-white"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
      )}

      {activeTab === "paste" && !isValid && (
        <p className="text-xs sm:text-sm text-gray-500 mb-4 text-center">
          Add {charsNeeded} more characters to roast your CV 🥔
        </p>
      )}

      <div className="relative inline-block w-full sm:w-auto">
        <span className="absolute left-[-4px] bottom-[-8px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />
        <button
          type="button"
          onClick={handleRoast}
          disabled={!isValid || loading || activeTab === "upload"}
          className={`relative z-10 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#f2b055] text-[#66421f] rounded-xl font-bold text-base sm:text-lg transition-all duration-100 active:translate-y-[8px] ${!isValid || loading || activeTab === "upload"
            ? "opacity-100 cursor-not-allowed"
            : "cursor-pointer"
            }`}
        >
          {loading ? (
            <span className="flex flex-col items-center gap-1">
              <span className="text-sm sm:text-base">{loadingMessage}</span>
              <svg className="animate-spin h-5 w-5 mt-1" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          ) : (
            <span>🥔 Roast My CV</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoastForm;