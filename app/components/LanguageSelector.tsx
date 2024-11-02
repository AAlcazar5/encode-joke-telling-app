import React from 'react';
import { LanguageSelectorProps } from '../types/types';

export function LanguageSelector({ languages, state, handleChange }: LanguageSelectorProps) {
  return (
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
  );
}
