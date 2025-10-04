
import React from 'react';
import type { ResultFiles } from '../types';
import { Card } from './common/Card';
import { Spinner } from './common/Spinner';
import { Button } from './common/Button';
import { Icon } from './common/Icon';

interface OutputSectionProps {
  isLoading: boolean;
  results: ResultFiles | null;
}

const ResultLink: React.FC<{ href?: string; label: string; icon: string }> = ({ href, label, icon }) => {
  if (!href) return null;
  
  return (
    <a href={href} download className="block">
      <Button variant="secondary" className="w-full justify-start">
        <Icon name={icon} className="mr-3" />
        {label}
        <Icon name="download" className="ml-auto" />
      </Button>
    </a>
  );
};

export const OutputSection: React.FC<OutputSectionProps> = ({ isLoading, results }) => {
  return (
    <Card title="3. Your Dubbed Files" icon={<Icon name="folder" />}>
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Spinner />
          <p className="mt-4 text-lg font-semibold text-brand-text">Processing your video...</p>
          <p className="text-brand-text-secondary">This may take a few minutes. Please don't close this tab.</p>
        </div>
      )}
      {results && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <ResultLink href={results.videoUrl} label="Dubbed Video (MP4)" icon="video" />
          <ResultLink href={results.audioUrl} label="Dubbed Audio (MP3)" icon="audio" />
          <ResultLink href={results.srtUrl} label="Subtitles (SRT)" icon="subtitle" />
          <ResultLink href={results.transcriptUrl} label="Transcript (TXT)" icon="document" />
          <ResultLink href={results.notesUrl} label="Translation Notes (TXT)" icon="document" />
        </div>
      )}
    </Card>
  );
};
