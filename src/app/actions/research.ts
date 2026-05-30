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

export async function elaborateTopic(
  topic: string,
  brandName: string,
  hook?: string,
  story?: string,
  cta?: string,
  theme?: string
): Promise<ResearchResult> {
  try {
    const model = getGeminiModel("gemini-flash-latest"); // Use Flash for speed and cost-efficiency

    const prompt = `
      You are an expert content creator for social media carousels for the brand "${brandName}".
      Topic: "${topic}"
      Language: Indonesian (Bahasa Indonesia)

      ${hook ? `CRITICAL CONSTRAINT: You MUST incorporate this specific Hook into the first slide's hook/title or intro:\n"${hook}"` : ''}
      ${story ? `CRITICAL CONSTRAINT: You MUST incorporate or adapt this Story/Content direction into the content/body of the slides:\n"${story}"` : ''}
      ${cta ? `CRITICAL CONSTRAINT: You MUST incorporate this Call to Action (CTA) in the final slide's content and/or the caption:\n"${cta}"` : ''}

      Narrative Flow & Cohesion Constraints (CRITICAL):
      - High Cohesion: All slides MUST form a highly coherent, continuous, and logical narrative.
      - Hook Expansion: The title and hook on Slide 1 establish the main focus. Slide 2 and Slide 3 MUST directly expand on, explain, or support Slide 1's hook. Do not allow the topic to drift.
      - Empty Story Fallback: If a custom Hook is provided but the Story/Content body is empty, you MUST base the entire carousel content (Slide 2 and Slide 3) on explaining/elaborating that custom Hook.

      Slide Formatting & Layout Constraints (CRITICAL):
      - Slide Title: MUST be short, punchy, and compelling (MAXIMUM 5-6 words). Do NOT use long sentences or paragraphs as titles.
      - Slide Content: MUST be extremely concise and clean. Keep the total text under 35 words per slide.
      - Lists: If you use a numbered list or bullet list in the slide content, limit it to EXACTLY 2 or 3 short items. Keep each list item under 10 words.
      - Spacing: Do not write long blocks of text. Ensure it fits comfortably within a vertical Instagram slide.

      Step 1: Use Google Search to find 3-Indonesia-specific latest news or key insights about this topic.
      Step 2: Summarize the findings into exactly 3 slides for an Instagram carousel conforming to the Slide Formatting Constraints above.
      Step 3: Write a compelling and engaging Instagram caption for this carousel. The caption should be structured with:
        - A catchy hook ${hook ? `(aligned with: "${hook}")` : ''}
        - A brief summary of the slides
        - Call to action (CTA) ${cta ? `(must include: "${cta}")` : ''}
        - Relevant hashtags (5-10)

      You MUST respond ONLY with a raw JSON object matching the schema below. 
      Do NOT wrap the response in markdown formatting (like \`\`\`json), do NOT include any introduction, and do NOT include any commentary outside the JSON object. The response must be strictly parseable by JSON.parse().

      JSON Schema:
      {
        "slides": [
          { "title": "Slide 1 Hook / Title", "content": "Slide 1 Content Body" },
          { "title": "Slide 2 Key Insight / Title", "content": "Slide 2 Content Body" },
          { "title": "Slide 3 CTA / Title", "content": "Slide 3 Content Body" }
        ],
        "caption": "Full Instagram caption text here...",
        "sources": ["source_url_1", "source_url_2"]
      }

      Ensure the tone matches the brand and the topic. If it's news, be professional. If it's lifestyle, be creative.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean response text to extract only the JSON object
    let jsonText = text.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(json)?/, "").replace(/```$/, "").trim();
    }
    
    const firstBrace = jsonText.indexOf("{");
    const lastBrace = jsonText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.substring(firstBrace, lastBrace + 1);
    }

    const data = JSON.parse(jsonText);

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
        theme: theme || 'financial',
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
