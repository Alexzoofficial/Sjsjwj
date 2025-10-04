
export type LocalizationOption = 'literal' | 'natural' | 'localized';

export interface Character {
  id: string;
  label: string;
  persona: string;
  gender: 'male' | 'female' | 'neutral';
  age: string;
  tone: string;
}

export interface ResultFiles {
  audioUrl?: string;
  videoUrl?: string;
  srtUrl?: string;
  transcriptUrl?: string;
  notesUrl?: string;
}

export interface DubbingOptions {
  url: string;
  sourceLanguage: string;
  targetLanguage: string;
  dialect: string;
  localization: LocalizationOption;
  outputs: string[];
  characters: Character[];
}

export interface Language {
  value: string;
  label: string;
}

export interface OutputFormat {
  value: string;
  label: string;
}
