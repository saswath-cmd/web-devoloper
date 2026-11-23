/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Dynamically initialize the Gemini SDK per request using environment parameters
function getGeminiClient(): { ai: GoogleGenAI; apiKey: string } {
  const currentKey = process.env.GEMINI_API_KEY || "";
  if (!currentKey) {
    throw new Error("Gemini API key is not configured inside server process environment. Please verify Settings > Secrets.");
  }
  const instance = new GoogleGenAI({
    apiKey: currentKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  return { ai: instance, apiKey: currentKey };
}

// Serve list of current system/environment properties to frontend (safely)
app.get("/api/status", (req, res) => {
  const currentKey = process.env.GEMINI_API_KEY || "";
  res.json({
    status: "online",
    hasApiKey: !!currentKey,
    timestamp: new Date().toISOString(),
  });
});

// 1. Mentor Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    let clientConfig;
    try {
      clientConfig = getGeminiClient();
    } catch (keyError: any) {
      return res.status(503).json({
        error: "Gemini API key is not configured. Please add it via Settings > Secrets.",
      });
    }

    const { ai } = clientConfig;

    // Adapt format for Gemini. The last message is the user query.
    // We map preceding dialogue context safely.
    const lastUserMessage = messages[messages.length - 1];
    const systemPrompt = `You are WebDev Master AI, an elite web development mentor, teacher, and builder.
Your primary mission is to help the student learn web development as quickly as possible, and become job-ready.

INSTRUCTIONS:
- Explain things with outstanding real-world analogies (e.g. comparing the DOM to a tree, HTML to wood studs, CSS to wallpaper, JS to the electrical system, servers to restaurant kitchens).
- Focus on the 20% of skills that produce 80% of actual results.
- Assume the user is an enthusiastic beginner. Use helpful, encouraging, and masterly tones.
- If they ask for custom exercises, provide them clearly in structured markdown.
- Give a mini code project of about 10-20 lines if relevant and ask them visual questions to test their understanding.
- Do not provide verbose terminal telemetry or system coordinates unless explicitly requested.
- Keep answers structured with bold subtitles, bullet points, and clean syntax blocks.`;

    const formattedContents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const modelToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let response: any = null;
    let lastError: any = null;

    for (const modelName of modelToTry) {
      try {
        console.log(`Running mentor chat query using model: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
        if (response) {
          console.log(`Successfully acquired content with model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Mentor chat model ${modelName} failed or unavailable:`, err?.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("All text generative models returned undefined or failed.");
    }

    const replyText = response.text || "I was unable to formulate a response. Please tray again.";
    
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in Mentor Chat:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error in Gemini execution." });
  }
});

// 2. Project Architect Generator route
app.post("/api/generate-project", async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || typeof description !== "string") {
      return res.status(400).json({ error: "Description string is required." });
    }

    let clientConfig;
    try {
      clientConfig = getGeminiClient();
    } catch (keyError: any) {
      return res.status(503).json({
        error: "Gemini API key is missing. Ensure GEMINI_API_KEY is configured in your project secrets.",
      });
    }

    const { ai } = clientConfig;

    const systemPrompt = `You are the WebDev Project Architect module inside WebDev Master AI.
The user wants to generate a complete, working frontend website or page from their simple description.
Create a complete beginner-friendly project plan, visual styling, and the source code itself using standard HTML and Tailwind CSS so we can immediately preview it in an iframe.

YOUR TASK:
Generate a fully complete prototype code, clear beginner explanations, and specific files.
You MUST output exactly the requested structural properties in JSON according to the schema.
Keep style visually impressive using modern developer palettes (carbon, deep sapphire, slate, bright emerald tints). Ensure all touch targets are clean and buttons have interactive hover classes.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "Descriptive name for the client project.",
        },
        description: {
          type: Type.STRING,
          description: "A summary of what this website provides.",
        },
        architecture: {
          type: Type.STRING,
          description: "Technical architectural map of elements.",
        },
        folderStructure: {
          type: Type.STRING,
          description: "Interactive visual bulleted list representing the project's folder hierarchy.",
        },
        explanation: {
          type: Type.STRING,
          description: "A complete step-by-step, beginner-friendly explanation of standard components used and how HTML elements play with Tailwind CSS classes.",
        },
        files: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              path: {
                type: Type.STRING,
                description: "Name which tells us the file target (e.g. index.html, index.js, package.json).",
              },
              content: {
                type: Type.STRING,
                description: "The full source code of the file. If it's HTML, include a full template with embedded Tailwind and interactive state handlers if relevant.",
              },
              language: {
                type: Type.STRING,
                description: "Language code for typography highlighting (e.g. html, js, css).",
              },
            },
            required: ["path", "content", "language"],
          },
        },
        learningMilestones: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: "3 key focus objectives for students to study on this built project.",
        },
      },
      required: [
        "title",
        "description",
        "architecture",
        "folderStructure",
        "explanation",
        "files",
        "learningMilestones",
      ],
    };

    const modelToTry = ["gemini-3.5-flash", "gemini-flash-latest"];
    let response: any = null;
    let lastError: any = null;

    for (const modelName of modelToTry) {
      try {
        console.log(`Running project generator query using model: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: `Build a highly polished, working client web page for: "${description}". The page must be fully contained inside a single HTML file with embedded script/Tailwind so it renders instantly. Output standard files: "index.html" (or custom scripts). Ensure visual balance, beautiful responsive layouts, and rich developer comments.`,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
          },
        });
        if (response) {
          console.log(`Successfully acquired project content with model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Project generation model ${modelName} failed or unavailable:`, err?.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error("All text-to-JSON generative models returned undefined or failed.");
    }

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty content generated by model.");
    }

    const payload = JSON.parse(resultText);
    res.json(payload);
  } catch (error: any) {
    console.error("Error generating sandbox project:", error);
    res.status(500).json({ error: error?.message || "Failed to generate structural client project." });
  }
});

// Configure Vite or Static Assets serving based on container context
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite hmr middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode serving pre-built static bundle files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebDev Master AI server operating at http://localhost:${PORT}`);
  });
}

setupServer();
