const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log("Available Models:");
      data.models.forEach((m) => {
        console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
        console.log(`  Methods: ${m.supportedGenerationMethods.join(", ")}`);
      });
    } else {
      console.log("No models found or error in response:", data);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
