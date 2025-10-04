
import React from 'react';
import type { LocalizationOption, Language, OutputFormat } from '../types';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { Select } from './common/Select';
import { Icon } from './common/Icon';

interface InputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  sourceLanguage: string;
  setSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  dialect: string;
  setDialect: (dialect: string) => void;
  localization: LocalizationOption;
  setLocalization: (option: LocalizationOption) => void;
  outputs: string[];
  handleOutputChange: (value: string) => void;
  languages: Language[];
  outputFormats: OutputFormat[];
}

export const InputSection: React.FC<InputSectionProps> = ({
  url, setUrl,
  sourceLanguage, setSourceLanguage,
  targetLanguage, setTargetLanguage,
  dialect, setDialect,
  localization, setLocalization,
  outputs, handleOutputChange,
  languages, outputFormats
}) => {
  return (
    <Card title="1. Project Setup" icon={<Icon name="settings" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Source Video URL"
          id="video-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Select
            label="Source Language"
            id="source-language"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            options={languages}
          />
          <Select
            label="Target Language"
            id="target-language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            options={languages}
          />
        </div>
        
        <Input
            label="Preferred Dialect (Optional)"
            id="dialect"
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            placeholder="e.g., Indian Hindi"
        />
        
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-2">Translation Preference</label>
          <div className="flex space-x-4 bg-brand-secondary p-1 rounded-lg">
            {(['literal', 'natural', 'localized'] as LocalizationOption[]).map((option) => (
              <button
                key={option}
                onClick={() => setLocalization(option)}
                className={`flex-1 capitalize text-sm font-semibold py-2 px-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary ${
                  localization === option ? 'bg-brand-primary text-white' : 'text-brand-text-secondary hover:bg-brand-surface'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brand-text-secondary mb-2">Output Formats</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {outputFormats.map((format) => (
              <label key={format.value} className="flex items-center space-x-3 p-3 bg-brand-secondary rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={outputs.includes(format.value)}
                  onChange={() => handleOutputChange(format.value)}
                  className="h-4 w-4 rounded border-gray-500 bg-brand-surface text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm font-medium text-brand-text">{format.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
