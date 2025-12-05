import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    const imageUrl = image.data[0].url;

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: "Backend crashed on Vercel" });
  }
}
