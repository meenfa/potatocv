"use client";

import { Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CustomCircleButton from "../common/CustomCircleButton";

interface RoastFormProps {
  resume: string;
  setResume: (value: string) => void;
  handleRoast: () => void;
  loading: boolean;
}

const MIN_RESUME_LENGTH = 100;
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const loadingMessages = [
  "Reading your CV… trying not to laugh",
  "Detecting buzzwords… found a few",
  "Roasting in progress… please hold",
  "Consulting the potato experts…",
  "Almost done… brace yourself",
];

const RoastForm = ({ resume, setResume, handleRoast, loading }: RoastFormProps) => {
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [, setMessageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const trimmedLength = resume.trim().length;
  const isValid = trimmedLength >= MIN_RESUME_LENGTH;
  const charsNeeded = MIN_RESUME_LENGTH - trimmedLength;

  useEffect(() => {
    if (!loading) {
      setLoadingMessage(loadingMessages[0]);
      setMessageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setMessageIndex((previous) => {
        const next = (previous + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[next]);
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const contentType = res.headers.get("content-type") || "";
    const rawText = await res.text();
    if (!res.ok) throw new Error("Try a different file or paste your CV instead.");
    if (!contentType.includes("application/json")) {
      throw new Error("Something went wrong. Try pasting your CV instead.");
    }
    const data = JSON.parse(rawText);
    if (!data?.text) throw new Error("Could not read text from this file. Try pasting instead.");
    return data.text;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", { description: "Please choose a PDF or DOCX under 3 MB." });
      event.target.value = "";
      return;
    }
    setIsExtracting(true);
    try {
      const text = await extractTextFromFile(file);
      setResume(text);
      setActiveTab("paste");
    } catch (error) {
      console.error("Error extracting file:", error);
      toast.error("Could not read that file", {
        description: error instanceof Error ? error.message : "Try pasting your resume instead.",
      });
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border-2 border-[#44260a] bg-white p-5 shadow-[6px_6px_0_#44260a] sm:p-8">
      <div className="mb-5 inline-flex w-full rounded-xl border border-[#44260a]/15 bg-[#fffdf5] p-1 sm:w-auto" role="group" aria-label="Choose how to add your resume">
        <button
          type="button"
          aria-pressed={activeTab === "upload"}
          className={"flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors sm:flex-none sm:text-base " + (activeTab === "upload" ? "bg-[#f2b055] text-[#211403] shadow-sm" : "text-[#66421f] hover:bg-[#f2b055]/15")}
          onClick={() => setActiveTab("upload")}
        >
          Upload file
        </button>
        <button
          type="button"
          aria-pressed={activeTab === "paste"}
          className={"flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors sm:flex-none sm:text-base " + (activeTab === "paste" ? "bg-[#f2b055] text-[#211403] shadow-sm" : "text-[#66421f] hover:bg-[#f2b055]/15")}
          onClick={() => setActiveTab("paste")}
        >
          Paste text
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="mb-6 flex min-h-56 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c68642]/60 bg-[#fffdf5] p-6 text-center sm:p-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx"
            className="sr-only"
            aria-label="Upload a PDF or DOCX resume"
          />
          <CustomCircleButton
            ariaLabel="Choose a PDF or DOCX resume to upload"
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtracting}
            className="h-12 w-12 sm:h-14 sm:w-14"
          >
            <Upload size={22} aria-hidden="true" />
          </CustomCircleButton>
          <p className="mt-4 font-bold text-[#44260a]">{isExtracting ? "Reading your file…" : "Choose your resume"}</p>
          <p className="mt-1 text-sm text-[#66421f]">PDF or DOCX · up to 3 MB</p>
        </div>
      )}

      {activeTab === "paste" && (
        <div className="mb-6">
          <label htmlFor="resume-text" className="mb-2 block text-left text-sm font-semibold text-[#44260a]">Your resume text</label>
          <textarea
            id="resume-text"
            placeholder="Paste your CV here. Don’t be shy—we’ve seen worse."
            className="h-44 w-full resize-y rounded-xl border border-[#44260a]/20 bg-[#fffdf5] p-4 text-sm text-[#44260a] placeholder:text-[#8b7968] focus:border-[#c68642] focus:outline-none focus:ring-4 focus:ring-[#c68642]/20 sm:text-base"
            value={resume}
            onChange={(event) => setResume(event.target.value)}
          />
          <p className="mt-2 text-right text-xs text-[#66421f]">{trimmedLength} characters</p>
        </div>
      )}

      {activeTab === "paste" && !isValid && (
        <p className="mb-4 text-center text-sm text-[#66421f]">
          Add {charsNeeded} more characters to get your roast.
        </p>
      )}

      <button
        type="button"
        onClick={handleRoast}
        disabled={!isValid || loading || activeTab === "upload"}
        className={"inline-flex w-full items-center justify-center rounded-xl border-2 border-[#211403] bg-[#f2b055] px-8 py-3.5 text-base font-extrabold text-[#211403] shadow-[0_3px_0_#211403] transition hover:bg-[#ffc66e] active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/40 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"}
      >
        {loading ? loadingMessage : <>Roast my CV <span aria-hidden="true" className="ml-2">↗</span></>}
      </button>
    </div>
  );
};

export default RoastForm;
