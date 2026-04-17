# Karusel: AI Carousel Content Generator

Karusel is an intelligent web application designed to streamline the creation of high-quality social media carousels. By leveraging Google's Gemini AI, Karusel researches complex topics, distill insights, and generates visually consistent carousel slides ready for Instagram, LinkedIn, or Twitter.

## Features

- **AI-Powered Content Research**: Automatically researches specific topics using Google Gemini to find the latest insights and news.
- **Automated Slide Generation**: Converts raw research into a structured 3-slide format (Hook + 2 Key Insights) tailored to your brand's voice.
- **Instant Visual Preview**: Real-time rendering of slides with a premium, dark-themed design.
- **High-Quality PNG Export**: Exports JSX components directly to high-resolution PNG images using Satori.
- **Batch Download**: Packages all generated slides into a single `.zip` file for immediate use on social media.
- **Brand Customization**: Allows defining a brand name to ensure content consistency across different topics.

## Tech Stack

- **Core**: [Next.js 16 (Turbopack)](https://nextjs.org/) & [React 19](https://react.dev/)
- **AI**: [Google Gemini AI (Generative AI SDK)](https://ai.google.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Rendering/Export**: [Satori](https://github.com/vercel/satori) & [resvg-js](https://github.com/yisibl/resvg-js)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: [JSZip](https://stuk.github.io/jszip/) for batch packaging

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Google AI (Gemini) API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd karusel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Screenshots

*(Use the `generate_image` tool to create a placeholder or actual screenshot if requested)*

## License

This project is licensed under the MIT License.
