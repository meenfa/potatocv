import { NextResponse } from "next/server";
import mammoth from "mammoth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const CV_KEYWORDS = [
  "experience", "education", "skills", "work", "project",
  "summary", "objective", "employment", "certification", "volunteer",
  "internship", "achievements", "languages", "references", "profile",
  "career", "qualification", "training", "award", "portfolio",
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    // Server-side size check (source of truth)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Please upload a file under 3MB. Your CV should not be that long! 🥔" },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();
    const fileType = file.type;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    const isPdf =
      fileType === "application/pdf" || fileName.endsWith(".pdf");

    const isDocx =
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx");

    if (isPdf) {
      // pdf-parse v1 is CommonJS and has no TypeScript declarations.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse/lib/pdf-parse");
      const result = await pdfParse(buffer);
      extractedText = result.text || "";
    } else if (isDocx) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value || "";
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF or DOCX." },
        { status: 400 }
      );
    }

    const cleanedText = extractedText.trim();

    if (!cleanedText) {
      return NextResponse.json(
        { error: "Could not extract any readable text. Try another file or paste your CV manually." },
        { status: 400 }
      );
    }

    // CV keyword check
    const lowerText = cleanedText.toLowerCase();
    const matchCount = CV_KEYWORDS.filter((k) => lowerText.includes(k)).length;

    if (matchCount < 2) {
      return NextResponse.json(
        { error: "This does not look like a CV. Please upload your actual resume! 🥔" },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: cleanedText });

  } catch (error) {
    console.error("Upload extraction error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to extract text from the uploaded file.",
      },
      { status: 500 }
    );
  }
}
