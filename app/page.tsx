"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Layout from "./layout";
import { GenreSelector } from "./components/GenreSelector";
import { ToneSelector } from "./components/ToneSelector";
import { TypeSelector } from "./components/TypeSelector";
import { LanguageSelector } from "./components/LanguageSelector";
import { CreativenessSlider } from "./components/CreativenessSlider";
import { ChatMessages } from "./components/ChatMessages";
import { ControlButtons } from "./components/ControlButtons";
import { topics, tones, types, languages } from "./data/options";

export default function Chat() {
  const { messages, append, isLoading, setMessages } = useChat();

  const [state, setState] = useState({
    genre: "",
    tone: "",
    type: "",
    temperature: 80,
    language: "english"
  });

  const [jokeGenerated, setJokeGenerated] = useState(false);

  // Ref for the chat messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the chat messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
    <Layout>
      <div className="flex items-center justify-center min-h-screen p-4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold dark:text-zinc-200 text-zinc-800">
              Joke Bot 1000
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the joke by selecting the genre, tone, creativeness, type of joke, and language. Or just click generate random joke.
            </p>
          </div>

          <GenreSelector options={topics} handleChange={handleChange} />
          <ToneSelector options={tones} handleChange={handleChange} />
          <TypeSelector options={types} handleChange={handleChange} />
          <div className="flex space-x-4">
            <LanguageSelector languages={languages} state={state} handleChange={handleChange} />
            <CreativenessSlider state={state} handleTemperatureChange={handleTemperatureChange} />
          </div>
          <ControlButtons
            isLoading={isLoading}
            state={state}
            jokeGenerated={jokeGenerated}
            handleGenerateJoke={handleGenerateJoke}
            handleGenerateRandomJoke={handleGenerateRandomJoke}
            handleCriticizeJoke={handleCriticizeJoke}
          />
          <ChatMessages filteredMessages={filteredMessages} />
          {/* Invisible div to ensure scrolling to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </Layout>
  );
}