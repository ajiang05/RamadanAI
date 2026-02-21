import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the SDK. It will automatically pick up process.env.GEMINI_API_KEY
// Note: Since we saved it as NEXT_PUBLIC_GEMINI_API_KEY originally, we must pass it explicitly here.
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Ramadan Companion", an empathetic, highly knowledgeable, and deeply compassionate Islamic scholar and guide.
Your purpose is to help Muslims navigate the holy month of Ramadan by explaining Quranic verses, offering spiritual reflections, and generating personalized Duas (prayers).

When a user provides a topic, feeling, or a specific Quranic verse:
1. Provide the context or Tafsir (exegesis) of the verse in an accessible, conversational way.
2. Relate the verse to the modern daily struggles or emotions the user might be feeling during Ramadan.
3. Conclude with a beautifully written, short, and personalized Dua that the user can recite.

Format your response in Markdown. Use bolding to highlight key concepts. Ensure your tone is warm, welcoming, and culturally authentic.
`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            },
        });

        return NextResponse.json({ reflection: response.text });
    } catch (error) {
        console.error("Error generating reflection:", error);
        return NextResponse.json(
            { error: "Failed to generate reflection. Please try again later." },
            { status: 500 }
        );
    }
}
