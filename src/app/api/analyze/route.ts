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
      You are a witty, brutal, and hilarious career coach. Your goal is to roast this resume in a funny, over-the-top, comedic way — make it sharp, sarcastic, and brutally honest, but not offensive. Push the humor to the limit.

 IMPORTANT:
          - Structure the response in clear sections
          - Headings should be left-aligned with emojis
          - Roast text should start from left, aligned with heading
          - Each section: 3-6 lines for stronger roasting
          - Make it readable, with short paragraphs, not one long wall of text
          - Be playful, sarcastic, and exaggerate flaws for comedy
          - Use emojis and humor to highlight weaknesses

         FORMAT:
          💥 SHOWSTOPPER INTRO
          (Exaggerated, dramatic opening to your resume)

          📬 Who Even Are You?
          (Hilarious jab at contact info)

          🎯 Dream Big… Or Not
          (Sarcastic take on your career objective)

          🎓 Brain Drain Academy
          (Funny poke at education)

          💼 Work Woes
          (Highlight funny mistakes or struggles in experience)

          🧠 Skillz or Not?
          (Roast missing or questionable skills)

          😱 Reality Slap
          (A brutal, funny closing line)

          🔍 Tiny Truth Bomb
          (Short witty summary of their resume)
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
              content: "You are a brutally honest, sarcastic, and witty career coach. Always roast resumes in a funny, over-the-top, comedic way. Make it sarcastic, sharp, and brutally honest, but never offensive."
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data, null, 2));

    const result =
      data?.choices?.[0]?.message?.content ||
      "Hmm… something went wrong on my end. Or maybe your CV is just too perfect for me to handle! Keep slaying!😅";

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenRouter error:", error);
    return NextResponse.json({
      result: `Something went wrong: ${error.message}`,
    });
  }
}