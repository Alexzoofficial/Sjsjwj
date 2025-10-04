
import type { Character, Language, OutputFormat } from './types';

export const LANGUAGES: Language[] = [
  { value: 'ar', label: 'Arabic' },
  { value: 'bn', label: 'Bengali' },
  { value: 'zh-CN', label: 'Chinese (Mandarin, Simplified)' },
  { value: 'zh-TW', label: 'Chinese (Mandarin, Traditional)' },
  { value: 'nl', label: 'Dutch' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'hi', label: 'Hindi' },
  { value: 'id', label: 'Indonesian' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ms', label: 'Malay' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'ro', label: 'Romanian' },
  { value: 'ru', label: 'Russian' },
  { value: 'es', label: 'Spanish' },
  { value: 'sv', label: 'Swedish' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'th', label: 'Thai' },
  { value: 'tr', label: 'Turkish' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'ur', label: 'Urdu' },
  { value: 'vi', label: 'Vietnamese' },
];

export const OUTPUT_FORMATS: OutputFormat[] = [
  { value: 'dubbed_audio.mp3', label: 'Dubbed Audio (MP3)' },
  { value: 'dubbed_video.mp4', label: 'Dubbed Video (MP4)' },
  { value: 'subtitles.srt', label: 'Subtitles (SRT)' },
  { value: 'transcript_speakers.txt', label: 'Transcript (TXT)' },
  { value: 'translation_notes.txt', label: 'Translation Notes (TXT)' },
];

export const DEFAULT_CHARACTER: Omit<Character, 'id'> = {
  label: 'New Character',
  persona: 'clear, conversational',
  gender: 'neutral',
  age: '25-45',
  tone: 'neutral',
};
