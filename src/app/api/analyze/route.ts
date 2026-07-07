import { NextRequest, NextResponse } from "next/server";

interface AIRequestBody {
  model: string;
  messages: Array<{ role: "system" | "user"; content: string }>;
  temperature: number;
  max_tokens: number;
}

interface AIResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message: string };
}

interface RequestBody {
  resume: string;
  mode: "roast" | "improve";
}

// Persona-driven prompts that anchor the AI to specific resume anti-patterns
const PROMPTS = {
  roast: {
    system: `You are the Gordon Ramsay of tech recruiting. You've reviewed 10,000+ resumes and have zero patience for fluff.
    
RULES:
- Target SPECIFIC weaknesses: buzzword soup, vague metrics ("improved performance"), formatting crimes, or delusional self-assessments.
- Use sharp, witty, memorable one-liners. Avoid generic insults like "this is bad."
- Reference actual content from the resume when possible.
- Output EXACTLY 3 punchy lines separated by newlines. No numbering, no labels, no preamble.
- Never say "as an AI" or explain your reasoning.`,
    user: (resume: string) =>
      `Roast this resume in exactly 3 savage, specific lines:\n\n${resume}`,
    temperature: 0.7,
    maxTokens: 256,
  },
  improve: {
    system: `You are a senior FAANG recruiter who wants candidates to succeed. Give actionable, specific feedback.
    
RULES:
- Focus on HIGH-IMPACT changes only (metrics, structure, keyword optimization).
- Be direct and practical. No fluff or encouragement.
- Output EXACTLY 2 bullet points separated by newlines. No numbering or labels.`,
    user: (resume: string) =>
      `Give exactly 2 high-impact improvements for this resume:\n\n${resume}`,
    temperature: 0.4,
    maxTokens: 200,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { resume, mode } = body;

    if (!resume || typeof resume !== "string" || !resume.trim()) {
      return NextResponse.json(
        { result: "No resume provided 😅" },
        { status: 400 },
      );
    }

    const config = PROMPTS[mode];
    const trimmedResume = resume.trim().slice(0, 8000); // Safety limit for context window

    const requestBody: AIRequestBody = {
      model: process.env.AI_MODEL || "gemini-2.5-flash-preview-05-20",
      messages: [
        { role: "system", content: config.system },
        { role: "user", content: config.user(trimmedResume) },
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    };

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API error: ${response.status} ${JSON.stringify(errorData)}`,
      );
    }

    const data: AIResponse = await response.json();
    const rawResult = data?.choices?.[0]?.message?.content || "";
    const cleanedResult = cleanAiOutput(rawResult, mode);

    return NextResponse.json({ result: cleanedResult });
  } catch (error: any) {
    console.error("Error in /api/analyze:", error);
    return NextResponse.json(
      {
        result: error.message.includes("API error")
          ? "Our PotatoAI is on a Chiya break ☕. Try again in a moment!"
          : "Something went wrong. Try again or check your input!",
      },
      { status: 500 },
    );
  }
}

function cleanAiOutput(text: string, mode: "roast" | "improve"): string {
  if (!text) {
    return mode === "roast"
      ? "The AI fumbled the roast this time. Try again 😅"
      : "No improvements found. Your CV is already perfect! 😎";
  }

  const maxLines = mode === "roast" ? 3 : 2;

  // Strip markdown formatting, numbering, and common AI meta-phrases
  let cleaned = text
    .replace(/^[\d]+[\.\)\-]\s*/gm, "") // Remove "1.", "2)", "- " prefixes
    .replace(/^\*\*|\*\*$/gm, "") // Remove bold markers
    .replace(/^(here are|sure|okay|as an ai)[\s:,]*/gi, "") // Strip filler openers
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, maxLines)
    .join("\n");

  return (
    cleaned ||
    (mode === "roast"
      ? "Our PotatoAI fumbled the roast this time. Try again 😅"
      : "No improvements found. Your CV is already perfect! 😎")
  );
}
