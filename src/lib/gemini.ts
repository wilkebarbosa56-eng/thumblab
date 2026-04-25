import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateThumbnailImage(prompt: string, aspectRatio: "16:9" | "9:16" | "1:1" = "16:9") {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        {
          text: `Professional high-quality YouTube/Social Media thumbnail: ${prompt}. Cinematic lighting, vibrant colors, high contrast, viral style.`,
        },
      ],
      config: {
        imageConfig: {
          aspectRatio,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from Gemini");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
}

export async function suggestPrompts(baseTopic: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 viral YouTube thumbnail prompts for the topic: "${baseTopic}". Return only the prompts as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "[]") as string[];
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return [];
  }
}
