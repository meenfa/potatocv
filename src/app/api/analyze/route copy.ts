import { NextRequest, NextResponse } from "next/server";

interface AIRequestBody {
  model: string;
  messages: Array<{
    role: "system" | "user";
    content: string;
  }>;
  temperature: number;
  max_tokens: number;
  stop?: string[];
}

interface AIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message: string;
  };
}

interface RequestBody {
  resume: string;
  mode: "roast" | "improve";
}

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

    const trimmedResume = resume.trim();
    const systemPrompt =
      mode === "roast"
        ? "You are a savage and funny resume roaster. Respond only with the final answer. Never include reasoning, analysis, planning, observations, or labels like Line1. Output exactly 3 short roast sentences."
        : "You are a resume reviewer. Respond only with 1-2 short practical improvements. No reasoning or extra text.";

    const userPrompt =
      mode === "roast"
        ? `Roast this resume in 3 short savage funny sentences.\n\n${trimmedResume}`
        : `Give 1-2 short practical resume improvements.\n\n${trimmedResume}`;

    const requestBody: AIRequestBody = {
      model: process.env.AI_MODEL || "gemini-3.1-flash-lite-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: mode === "roast" ? 0.3 : 0.5,
      max_tokens: mode === "roast" ? 120 : 100,
      stop: ["We need", "Let's", "Line1", "Line 1"],
    };

    // const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
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
        `Mistral API error: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`,
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
          ? "Our PotatoAI is on a Chiya break☕. Try again in a moment!"
          : "Something went wrong. Try again or check your input!",
      },
      { status: 500 },
    );
  }
}

function cleanAiOutput(text: string, mode: "roast" | "improve") {
  if (!text) {
    return mode === "roast"
      ? "The AI fumbled the roast this time. Try again 😅"
      : "No improvements found. Your CV is already perfect! 😎";
  }

  const blockedPrefixes = [
    "We need",
    "Let's",
    "Let us",
    "Line1",
    "Line 1",
    "Line2",
    "Line 2",
    "Line3",
    "Line 3",
    "Step 1",
    "Step 2",
    "Step 3",
    "Explanation:",
    "Analysis:",
    "Observation:",
    "Here are",
  ];

  let cleaned = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) => !blockedPrefixes.some((prefix) => line.startsWith(prefix)),
    )
    .join("\n")
    .trim();

  if (mode === "roast") {
    const sentences = cleaned
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 3);
    cleaned = sentences.join("\n");
  } else {
    const lines = cleaned
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 2);
    cleaned = lines.join("\n");
  }

  return (
    cleaned ||
    (mode === "roast"
      ? "Our PotatoAI fumbled the roast this time. Try again 😅"
      : "No improvements found. Your CV is already perfect! 😎")
  );
}
