"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading, setMessages } = useChat();

  const topics = [
    { emoji: "✈️", value: "airports" },
    { emoji: "🙄", value: "pet peeves" },
    { emoji: "👪", value: "family" },
    { emoji: "🍔", value: "food" },
    { emoji: "🤖", value: "technology" }
  ];

  const tones = [
    { emoji: "😏", value: "sarcastic" },
    { emoji: "🤪", value: "silly" },
    { emoji: "🌵", value: "dry" },
    { emoji: "🤔", value: "thoughtful" },
    { emoji: "😈", value: "dark" },
  ];

  const types = [
    { emoji: "🤡", value: "satire" },
    { emoji: "🤣", value: "one-liner" },
    { emoji: "📖", value: "anecdote" },
    { emoji: "👀", value: "observational" },
    { emoji: "🫵", value: "self-deprecating" },
  ];

  const languages = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "Portuguese", value: "portuguese" },
    { label: "French", value: "french" },
    { label: "Italian", value: "italian" },
  ];
  
  const [state, setState] = useState({
    genre: "",
    tone: "",
    type: "",
    temperature: 80,
    language: "english"
  });

  const [jokeGenerated, setJokeGenerated] = useState(false);
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      temperature: parseFloat(event.target.value)
    });
  };

  const handleGenerateJoke = () => {
    if (!state.genre || !state.tone || !state.type) {
      console.error("All fields must be selected before generating a joke.");
      return;
    }

    // Clear previous messages
    setMessages([]);

    append({
      role: "user",
      content: `Generate a ${state.genre} joke in a ${state.tone} tone with ${state.temperature}% creativeness in ${state.language}`,
    });

    setJokeGenerated(true);
  };

  const handleGenerateRandomJoke = () => {
    // Clear previous messages
    setMessages([]);

    append({
      role: "user",
      content: `Generate a random joke in English`,
    });

    setJokeGenerated(true);
  };

  const handleCriticizeJoke = () => {
    append({
      role: "user",
      content: `Critique the joke based on creativeness, humor, joke structure, writing, and comprehensiveness. Provide a score for each category out of 10, for a total of 50.`
    });
  };

  // Filter out messages that are prompts
  const filteredMessages = messages.filter(
    (message) => !message.content.startsWith("Generate") && !message.content.includes("Critique the joke")
  );

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold dark:text-zinc-200 text-zinc-800">
              Joke Bot 1000
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the joke by selecting the genre, tone, creativeness, type of joke, and language. Or just click generate random joke.
            </p>
          </div>

          {/* Genre selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>
            <div className="flex flex-wrap justify-center">
              {topics.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Tone selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Type of joke selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Type</h3>
            <div className="flex flex-wrap justify-center">
              {types.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="type"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Language and Creativeness */}
          <div className="flex space-x-4">
            {/* Language selection */}
            <div className="flex-1 space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-center">Language</h3>
              <select
                name="language"
                value={state.language}
                onChange={handleChange}
                className="w-full p-2 bg-gray-600 text-white rounded-lg text-center"
              >
                {languages.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Temperature slider */}
            <div className="flex-1 space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-center">Creativeness</h3>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1" 
                value={state.temperature} 
                onChange={handleTemperatureChange} 
                className="w-full"
              />
              <p className="text-center">{state.temperature}%</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={isLoading || !state.genre || !state.tone || !state.type}
              onClick={handleGenerateJoke}
            >
              Generate Joke
            </button>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
              onClick={handleGenerateRandomJoke}
            >
              Generate Random Joke
            </button>

            {jokeGenerated && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
                onClick={handleCriticizeJoke}
              >
                Criticize Joke
              </button>
            )}
          </div>

          {/* Chat messages */}
          {filteredMessages.map((message, index) => (
            <div
              key={index}
              className="bg-opacity-75 bg-gray-800 text-white rounded-lg p-4 mt-4"
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}