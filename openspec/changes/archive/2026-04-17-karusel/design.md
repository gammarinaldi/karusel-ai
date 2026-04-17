## Context

The "Karusel" project is a Next.js 15 application designed to transform a simple user topic into a research-grounded, 4-page Instagram carousel. The system must bridge the gap between "text generation" and "visual asset creation."

## Goals / Non-Goals

**Goals:**
- **Automated Research**: Use Google Search grounding to find 3-5 relevant articles/sources for a topic.
- **4-Page Synthesis**: Specifically tailor synthesized content for 4 slides (Introduction, 2 Key Points, CTA).
- **Pixel-Perfect PNG Export**: Export slides as 1080x1350 (Instagram Portrait) or 1080x1080 images.
- **Modern Stack**: Utilize Next.js 15 Server Actions and App Router.

**Non-Goals:**
- **Multi-platform API Posting**: The system downloads the PNGs; it does not post them directly.
- **Video/Reels**: Limited to static image carousels for the MVP.

## Decisions

- **Framework**: **Next.js 15 (App Router)** for its robust Server Actions and API route handling.
- **AI Core**: **Gemini 3** for content generation, research summaries, and structure synthesis.
- **Search Strategy**: Use the Google AI SDK with **Google Search Grounding** enabled to verify Indonesian news and facts.
- **PNG Rendering**: Use **Satori** for generating the images. Satori allows defining the slides in JSX/Tailwind, ensuring the preview in the browser matches the exported image exactly.
- **Styling**: **Tailwind CSS** for layout and slide design templates.

## Risks / Trade-offs

- **Satori CSS Limitations**: Satori supports a subset of CSS; slide designs must be compatible with its rendering engine.
- **Elaboration Quality**: Summarizing complex news into exactly 2 core slides (plus Intro/CTA) requires precise prompt engineering to avoid oversimplification.
- **Cold Starts**: Generating images on the fly via serverless functions might encounter timeout issues for complex designs; we may need a streaming approach or optimized fonts.
