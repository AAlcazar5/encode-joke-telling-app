import React from 'react';
import { CreativenessSliderProps } from '../types/types';

export function CreativenessSlider({ state, handleTemperatureChange }: CreativenessSliderProps) {
  return (
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
  );
}
