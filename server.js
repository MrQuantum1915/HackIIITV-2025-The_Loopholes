const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleGenAI } = require("@google/genai"); // Import the new library
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load API key from .env file

const app = express();
const port = 3000;

app.use(cors());

app.get('/', async (request, response) => {
    try {
        const prompt = request.query.prompt;
        const page = request.headers['x-page-origin'];
        console.log("Request from Page:", page);

        if (!prompt) {
            return response.status(400).send('Prompt is required');
        }

        let responseText;

        if (page === 'iiitv_assistant.html') {
            const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);
            const model = genAI.getGenerativeModel({ model: "tunedModels/iiitvadodara" });
            const promptText = `You are assistant of IIIT Vadodara. You have to give answer for the user prompt. Give the response inside <div></div> block and not in markdown. User Prompt: ${prompt}`;
            const result = await model.generateContent(promptText);
            responseText = result.response.text();
            response.send(responseText);
        } 
        else if (page === 'roadmap.html') {
            // Use the new GoogleGenAI library for roadmap.html
            const ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_Key });
            const result = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [prompt],
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

            // Extract the response text and grounding metadata
            responseText = result.text;
            const groundingMetadata = result.candidates[0]?.groundingMetadata?.searchEntryPoint?.renderedContent;

            console.log("Grounding Metadata:", groundingMetadata);
            response.send(responseText);
        } else {
            const genAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const promptText = `You have to respond to this user prompt. Generate a single HTML <div class="GeminiResponse"> element with properly formatted content. Adjust headings (e.g., h1 to h2) and other elements accordingly. Exclude CSS, <head>, <body>, or <html> tags. Provide only the <div>...</div> content without wrapping it in code blocks or adding extra text. Do not write "Response to ....", only write the response content. User Prompt: ${prompt}`;
            const result = await model.generateContent(promptText);
            responseText = result.response.text();
            response.send(responseText);
        }

        
    } catch (error) {
        console.error("Error generating or sending response:", error);
        response.status(500).send('Error generating response');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
