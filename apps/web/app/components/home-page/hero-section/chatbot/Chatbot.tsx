"use client";
import { useState } from "react";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null); // Stores AI response

  const handleSubmit = async () => {
    if (query.trim() === "") return; // Prevent empty submissions

    // Mock AI Response (Replace this with an API call)
    setResponse(`AI Response: The legal answer to "${query}" will be here.`);

    setQuery(""); // Clear input after asking
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto mt-16 w-full max-w-5xl mx-auto">
      {/* Response Box (Only shows when there's a response) */}
      {response && (
        <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md mb-6 text-lg text-gray-900">
          {response}
        </div>
      )}


      {/* Chatbot Input */}
      <div className="flex items-center justify-center p-6 w-full">
        <input
          type="text"
          placeholder="Ask our AI legal assistant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[500px] text-gray-900 bg-white px-8 py-5 rounded-full focus:outline-none text-xl"
        />
        <button
          onClick={handleSubmit}
          className="ml-4 px-6 py-5 rounded-lg text-xl whitespace-nowrap bg-accent text-dark hover:scale-110 transition-transform duration-100"
        >
          Ask
        </button>
        <button className="ml-4 px-6 py-5 rounded-lg text-xl whitespace-nowrap bg-accent text-dark hover:scale-110 transition-transform duration-100">
          Upload Your Doc
        </button>
      </div>
    </div>
  );
}
