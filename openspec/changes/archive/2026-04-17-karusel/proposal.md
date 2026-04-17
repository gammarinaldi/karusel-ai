## Why

Designing social media carousels is a time-consuming process that often requires significant research and creative effort to ensure content is both engaging and accurate. "Karusel" addresses this by automating the content lifecycle—from initial topic elaboration using Gemini 3 to factual grounding via Google Search—providing users with ready-to-use, high-quality, 4-page carousel images (.png) for Instagram.

## What Changes

- **Next.js 15 Core**: Implementation using the latest Next.js 15 App Router.
- **Search-Summarizer Pipeline**: Integration of Google Search grounding to find related articles and summarize them specifically for a 4-slide format.
- **PNG Export Engine**: A system to render React components into high-resolution .png images ready for social media posting.
- **Carousel UI**: A dedicated Next.js dashboard for topic submission and visual preview.

## Capabilities

### New Capabilities
- `content-orchestrator`: Manages the pipeline from user input to the final 4-slide structure.
- `topic-elaborator`: Uses Gemini 3 + Search Grounding to research topics (e.g., "saham Indonesia") and find relevant sources.
- `image-renderer`: The engine that converts the carousel preview into downloadable .png files.

### Modified Capabilities
(None)

## Impact

- **Tech Stack**: Next.js 15, Google AI SDK (Gemini 3), Search API, and Satori/Puppeteer for rendering.
- **Frontend**: Tailwind CSS for slide styling and responsive dashboard.
- **Backend**: Next.js Server Actions and Route Handlers for generation and export.
