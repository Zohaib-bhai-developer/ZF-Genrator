import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    console.log("Generate button clicked!");

    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.error) {
        alert("API Error: " + data.error);
        return;
      }

      setImage(data.imageUrl);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Problem in frontend or backend call failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI Image Generator</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
        className="w-full max-w-xl p-3 rounded-md text-black mb-4"
      />

      <button
        type="button"
        onClick={handleGenerate}
        className="
          bg-blue-600 
          hover:bg-blue-700 
          px-6 py-3 
          rounded-md 
          text-white 
          active:scale-95 
          transition-all 
          cursor-pointer 
          z-50
        "
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {image && (
        <img
          src={image}
          alt="Generated"
          className="mt-6 w-[350px] rounded-md shadow-md"
        />
      )}
    </div>
  );
}
