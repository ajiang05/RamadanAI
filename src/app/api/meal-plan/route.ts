import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Ramadan Companion" AI Nutritionist.
Your goal is to help Muslims plan their daily meals for the holy month of Ramadan based on their specific dietary restrictions.

The user will provide their dietary preferences (e.g., Vegan, Gluten-Free, Halal, None), their region, and their specific fitness goal for the month (e.g., Building Muscle, Losing Weight, Gaining Mass).

You must provide a plan consisting of:
1.  **Suhoor (Pre-dawn meal):** Focus on foods rich in complex carbohydrates, protein, and healthy fats that digest slowly to provide sustained energy throughout the fasting day. Emphasize hydration.
2.  **Iftar (Breaking the fast):** Focus on restorative, easily digestible foods. Recommend starting with dates and water (Sunnah) to replenish blood sugar, followed by a balanced main meal.

Format the response beautifully in Markdown. Use bolding to emphasize ingredients or benefits. Be culturally respectful and practical about cooking time. Keep the introduction brief and go straight into the meal suggestions.
`;

export async function POST(req: Request) {
    try {
        const { dietaryPreferences, region, goal } = await req.json();

        if (!dietaryPreferences) {
            return NextResponse.json({ error: "Dietary preferences are required" }, { status: 400 });
        }

        const prompt = `Please generate a Suhoor and Iftar meal plan. 
    My dietary preferences are: ${dietaryPreferences}. 
    My region is: ${region || "Unknown, assume standard 14 hour fast"}.
    My primary fitness goal during Ramadan is: ${goal || "Maintaining current health"}.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            },
        });

        return NextResponse.json({ plan: response.text });
    } catch (error) {
        console.error("Error generating meal plan:", error);
        return NextResponse.json(
            { error: "Failed to generate meal plan. Please try again later." },
            { status: 500 }
        );
    }
}
