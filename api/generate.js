import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    });

    res.status(200).json({
      imageUrl: result.data[0].url
    });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Backend error" });
  }
}
