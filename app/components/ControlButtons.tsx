import React from 'react';
import { ControlButtonsProps } from '../types/types';

export function ControlButtons({
  isLoading,
  state,
  jokeGenerated,
  handleGenerateJoke,
  handleGenerateRandomJoke,
  handleCriticizeJoke
}: ControlButtonsProps) {
  return (
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
  );
}
