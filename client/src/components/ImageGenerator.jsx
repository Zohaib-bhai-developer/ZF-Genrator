import { useState } from 'react';
import Loader from './Loader';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
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
      setImage(data.imageUrl);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">AI Image Generator</h1>
      <input
        type="text"
        placeholder="Enter your prompt..."
        className="p-3 rounded-lg w-80 mb-4 text-black"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 mb-6"
      >
        {loading ? <Loader /> : "Generate Image"}
      </button>
      {image && (
        <img
          src={image}
          alt="AI Generated"
          className="rounded-lg shadow-lg max-w-md"
        />
      )}
    </div>
  );
}
