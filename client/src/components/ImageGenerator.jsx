import { useState } from 'react';
import Loader from './Loader';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]); // Gallery
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.imageUrl) {
        setImages([data.imageUrl, ...images]); // add to gallery
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full mb-12">
      <h1 className="text-4xl font-bold mb-6">AI Image Generator</h1>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter your prompt..."
          className="p-3 rounded-lg w-80 text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={generateImage}
          className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500"
        >
          {loading ? <Loader /> : "Generate Image"}
        </button>
      </div>
    </div>
  );
}
