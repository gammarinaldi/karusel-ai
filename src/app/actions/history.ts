"use server";

import { supabase } from "@/lib/supabase";
import { ResearchResult } from "./research";

export interface GenerationHistory extends ResearchResult {
  id: string;
  topic: string;
  createdAt: string;
  theme: string;
}

export async function getHistory(): Promise<GenerationHistory[]> {
  try {
    const { data, error } = await supabase
      .from("generations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      topic: item.topic,
      brandName: item.brand_name,
      slides: item.slides,
      caption: item.caption,
      sources: item.sources,
      success: true,
      createdAt: item.created_at,
      theme: item.theme || "financial",
    }));
  } catch (error) {
    console.error("Fetch History Error:", error);
    return [];
  }
}
