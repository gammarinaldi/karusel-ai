"use server";

import { getGeminiModel } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export interface SlideContent {
  title: string;
  content: string;
}

export interface ResearchResult {
  success: boolean;
  slides?: SlideContent[];
  caption?: string;
  brandName?: string;
  error?: string;
  sources?: string[];
}

export async function elaborateTopic(topic: string, brandName: string): Promise<ResearchResult> {
  try {
    const model = getGeminiModel("gemini-flash-latest"); // Use Flash for speed and cost-efficiency

    const prompt = `
      You are an expert content creator for social media carousels for the brand "${brandName}".
      Topic: "${topic}"
      Language: Indonesian (Bahasa Indonesia)

      Step 1: Use Google Search to find 3-Indonesia-specific latest news or key insights about this topic.
      Step 2: Summarize the findings into exactly 3 slides for an Instagram carousel.
      Step 3: Write a compelling and engaging Instagram caption for this carousel. The caption should be structured with:
        - A catchy hook
        - A brief summary of the slides
        - Call to action (CTA)
        - Relevant hashtags (5-10)
      
      Output format (JSON only):
      {
        "slides": [
          { "title": "Slide 1 Hook", "content": "Introductory text" },
          { "title": "Slide 2 Key Insight", "content": "Body text" },
          { "title": "Slide 3 Key Insight", "content": "Body text" }
        ],
        "caption": "Full Instagram caption text here...",
        "sources": ["source_url_1", "source_url_2"]
      }

      Ensure the tone matches the brand and the topic. If it's news, be professional. If it's lifestyle, be creative.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (handling potential markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response into JSON");
    }

    const data = JSON.parse(jsonMatch[0]);

    const result_data = {
      success: true,
      slides: data.slides,
      caption: data.caption,
      brandName: brandName,
      sources: data.sources || [],
    };

    // Store in Supabase history
    try {
      const { error: dbError } = await supabase.from("generations").insert({
        topic: topic,
        brand_name: brandName,
        slides: data.slides,
        caption: data.caption,
        sources: data.sources || [],
      });
      if (dbError) console.error("Supabase Save Error:", dbError);
    } catch (dbErr) {
      console.error("Supabase Connection Error:", dbErr);
    }

    return result_data;
  } catch (error: any) {
    console.error("Research Error:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred during research.",
    };
  }
}
