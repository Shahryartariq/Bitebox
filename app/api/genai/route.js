import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import cookingPrompt from "@/lib/prompts/cookingPrompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { recipe, question } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const prompt = cookingPrompt({ recipe, question });

    console.log("Prompt sent to Gemini:", prompt);

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Gemini error:", err.message);

    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    );
  }
}
