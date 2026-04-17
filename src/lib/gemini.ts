import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiModel = (modelName = "gemini-flash-latest") => {
  return genAI.getGenerativeModel({
    model: modelName,
    tools: [
      {
        googleSearch: {},
      },
    ],
  });
};
