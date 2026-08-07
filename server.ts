import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "All India Tour & Travel API" });
  });

  // AI Itinerary Planner endpoint
  app.post("/api/gemini/plan", async (req, res) => {
    try {
      const { destination, durationDays, travelStyle, interests, budget, groupSize } = req.body;

      if (!destination) {
        return res.status(400).json({ error: "Destination is required" });
      }

      const prompt = `You are a master tour curator and cultural historian for "All India Tour & Travel" (established 1998, accredited by Ministry of Tourism, India).
Create a highly detailed, authentic, day-by-day travel itinerary for a travel trip in India.

Details provided by traveler:
- Destination/Region: ${destination}
- Duration: ${durationDays || 5} days
- Travel Style: ${travelStyle || "Luxury Heritage"}
- Traveler Interests: ${interests && interests.length ? interests.join(", ") : "Culture, Photography, Architecture, Local Cuisine"}
- Budget Level: ${budget || "Mid-Luxury"}
- Group Size: ${groupSize || "2 travelers"}

Return ONLY a valid JSON object matching this schema strictly without markdown code fences:
{
  "title": "Title of the Tour (e.g. Royal Jewels of Rajasthan: Jaipur & Udaipur Unveiled)",
  "tagline": "A compelling 1-line summary tagline",
  "overview": "A 2-3 sentence evocative overview highlighting the spirit of this itinerary.",
  "duration": "${durationDays || 5} Days / ${(durationDays || 5) - 1} Nights",
  "estimatedPricePerPerson": "INR ₹38,500 - ₹52,000",
  "recommendedBestSeason": "October to March",
  "keyHighlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4"],
  "days": [
    {
      "dayNumber": 1,
      "title": "Day title (e.g. Arrival in Jaipur & Evening Aarti at Birla Mandir)",
      "morning": "Detailed morning activity & local experience",
      "afternoon": "Detailed afternoon activity, lunch spot, monument visit",
      "evening": "Detailed evening event, cultural show, culinary dinner recommendation",
      "insiderTip": "A secret local tip from our senior tour historian",
      "stayRecommendation": "Luxury Heritage Hotel or Palace stay name"
    }
  ],
  "includedServices": ["Private AC Chauffeur", "5-Star Heritage Hotel Stay", "Monuments Fast-Track Entry", "Local Cultural Guide", "Daily Buffet Breakfast"],
  "culturalTrivia": "An interesting, lesser-known historical or cultural fact about the destination."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json({ success: true, itinerary: parsedData });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: "Failed to generate AI itinerary",
        details: error.message || "An unexpected error occurred",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`All India Tour & Travel Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
