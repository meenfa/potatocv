// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { resume, mode } = await req.json();

    if (!resume) {
      return NextResponse.json({ result: "No resume provided 😅" });
    }

    const prompt =
      mode === "roast"
        ? `Roast this resume in exactly 3 ruthless, savage, and funny lines.
          Target the biggest weaknesses only. Exaggerate flaws for humor.
          No fluff, no politeness.

          ${resume}`
                  : `Give 1-2 concise, practical resume improvements.

          ${resume}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen3.6-plus:free",
        messages: [
          {
            role: "system",
            content:
              mode === "roast"
                ? "You are a ruthless, savage, and witty resume critic. Your roasts are brutally honest, sharp, and funny. Focus only on obvious flaws, weak points, and cringe elements. Keep responses very short, punchy, and cutting. Never be abusive or offensive."
                : "You are a resume reviewer. Give 1-2 concise, practical, and actionable improvements.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 80,
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data, null, 2));

    const result =
      data?.choices?.[0]?.message?.content ||
      "Hmm… something went wrong. Or your CV escaped the roast 😅";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenRouter error:", error);
    return NextResponse.json({
      result: `Something went wrong: ${error.message}`,
    });
  }
}