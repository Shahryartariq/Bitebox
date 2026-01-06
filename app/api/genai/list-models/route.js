import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models?pageSize=50",
      {
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
