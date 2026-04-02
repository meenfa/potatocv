// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { resume, mode } = await req.json();

    if (!resume) {
      return NextResponse.json({ result: "No resume provided 😅" });
    }

    // Dynamic prompt
    const prompt =
      mode === "roast"
        ? `
You are a witty and funny career coach.

Roast this resume in a playful and humorous way (not offensive).

IMPORTANT:
- Structure your response in clear sections
- Use headings with emojis
- Keep each section short (2-4 lines max)
- Make it clean and readable (not one long paragraph)

Format:

🔥 Roast Summary
(1-2 funny lines)

📬 Contact Info
(short roast)

🎯 Objective
(short roast)

🎓 Education
(short roast)

💼 Experience
(short roast)

🧠 Skills
(short roast)

📌 Final Verdict
(1 funny closing line)

Resume:
${resume}
`
        : `Review this resume and give structured feedback with headings.`;
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
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
              content: "You are helpful, witty, and clear.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      }
    );

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data, null, 2));

    const result =
      data?.choices?.[0]?.message?.content ||
      "AI didn’t return anything 😅";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenRouter error:", error);
    return NextResponse.json({
      result: `Something went wrong: ${error.message}`,
    });
  }
}