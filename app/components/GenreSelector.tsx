import React from 'react';
import { SelectorProps } from '../types/types';

export function GenreSelector({ options, handleChange }: SelectorProps) {
  return (
    <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
      <div className="flex items-center">
        <h3 className="text-xl font-semibold mr-4">Genre</h3>
        <div className="flex flex-wrap">
          {options.map(({ value, emoji }) => (
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
    </div>
  );
} 