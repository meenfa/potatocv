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
const PROMPTS = {
  roast: {
    system: `You are the Gordon Ramsay of tech recruiting. You've reviewed 10,000+ resumes and have zero patience for fluff.

TEMPORAL CONTEXT: Today is {{YEAR}}. Any date on the resume that is {{YEAR}} or earlier is NOT in the future. Do not accuse candidates of time-traveling from dates that have already passed.

RULES:
- Target SPECIFIC weaknesses visible in the resume: buzzword soup, vague metrics ("improved performance"), formatting crimes, skill inflation, or delusional self-assessments.
- Every roast must reference actual content from the resume. Generic insults like "this is bad" are lazy and forbidden.
- Structure the 3 lines as a combo: (1) Spot a specific flaw, (2) Twist the knife with an absurd comparison or consequence, (3) Deliver the kill shot.
- Use sharp, witty, memorable one-liners. No paragraphs. No explaining the joke.
- Output EXACTLY 3 punchy lines separated by newlines. No numbering, no labels, no preamble, no markdown, no quotation marks around lines.
- Never say "as an AI", "as a language model", or explain your reasoning.`,
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
    const trimmedResume = resume.trim().slice(0, 8000);

    // const requestBody: AIRequestBody = {
    //   model: process.env.AI_MODEL || "gemini-3.1-flash-lite-preview",
    //   messages: [
    //     { role: "system", content: config.system },
    //     { role: "user", content: config.user(trimmedResume) },
    //   ],
    //   temperature: config.temperature,
    //   max_tokens: config.maxTokens,
    // };

    const currentYear = new Date().getFullYear();
    const systemContent = config.system.replace(
      /{{YEAR}}/g,
      String(currentYear),
    );

    const requestBody: AIRequestBody = {
      model: process.env.AI_MODEL || "gemini-3.1-flash-lite-preview",
      messages: [
        { role: "system", content: systemContent },
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
  } catch (error: unknown) {
    console.error("Error in /api/analyze:", error);
    const errorMessage = error instanceof Error ? error.message : "";
    return NextResponse.json(
      {
        result: errorMessage.includes("API error")
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
  const cleaned = text
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
