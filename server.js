import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Root route
app.get("/", (req, res) => {
  res.send("✅ Gemini Chatbot Server Running! Use /chat endpoint.");
});

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.message;
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
