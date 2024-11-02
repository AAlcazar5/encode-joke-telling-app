export interface Option {
  emoji?: string;
  value: string;
  label?: string;
}

export interface SelectorProps {
  options: Option[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface LanguageSelectorProps {
  languages: Option[];
  state: { language: string };
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface CreativenessSliderProps {
  state: { temperature: number };
  handleTemperatureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ControlButtonsProps {
  isLoading: boolean;
  state: { genre: string; tone: string; type: string };
  jokeGenerated: boolean;
  handleGenerateJoke: () => void;
  handleGenerateRandomJoke: () => void;
  handleCriticizeJoke: () => void;
}

export interface ChatMessagesProps {
  filteredMessages: { content: string }[];
} 