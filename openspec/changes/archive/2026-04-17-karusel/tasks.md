## 1. Project Initialization (Next.js 15)

- [x] 1.1 Scaffold a new Next.js 15 project using `npx create-next-app@latest`.
- [x] 1.2 Configure Tailwind CSS and Lucide React icons.
- [x] 1.3 Set up Google AI SDK (`@google/generative-ai`) and environment variables.

## 2. Search & Elaboration Pipeline

- [x] 2.1 Implement a Next.js Server Action for topic research using Google Search Grounding.
- [x] 2.2 Create a prompt for Gemini 3 that summarizes news into exactly 4 distinct slide contents.
- [x] 2.3 Implement support for Indonesian language processing in the AI pipeline.

## 3. Image Rendering Engine (Satori)

- [x] 3.1 Integrated Satori for HTML-to-SVG/PNG conversion.
- [x] 3.2 Create the "Slide Template" React components that will be shared between the preview and the renderer.
- [x] 3.3 Implement a Route Handler (`/api/export`) to handle multi-slide PNG generation and zipping.

## 4. Dashboard Implementation

- [x] 4.1 Build the Main Dashboard using the App Router.
- [x] 4.2 Develop the real-time previewer for the 4-slide carousel.
- [x] 4.3 Add a download feature to trigger the PNG export engine.
- [x] 4.4 Implement Indonesian Localization for the UI labels.
