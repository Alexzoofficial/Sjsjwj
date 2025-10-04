
import React, { useState, useCallback } from 'react';
import { InputSection } from './components/InputSection';
import { CharacterMapping } from './components/CharacterMapping';
import { OutputSection } from './components/OutputSection';
import { Button } from './components/common/Button';
import { Icon } from './components/common/Icon';
import type { Character, ResultFiles, LocalizationOption } from './types';
import { generateDubbing } from './services/dubbingService';
import { DEFAULT_CHARACTER, LANGUAGES, OUTPUT_FORMATS } from './constants';

const App: React.FC = () => {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [dialect, setDialect] = useState('');
  const [localization, setLocalization] = useState<LocalizationOption>('natural');
  const [outputs, setOutputs] = useState<string[]>(['dubbed_audio.mp3', 'subtitles.srt']);
  const [characters, setCharacters] = useState<Character[]>([
    { ...DEFAULT_CHARACTER, id: crypto.randomUUID(), label: 'Host' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResultFiles | null>(null);

  const handleCharacterChange = useCallback((updatedCharacter: Character) => {
    setCharacters(prev => prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
  }, []);

  const addCharacter = useCallback(() => {
    setCharacters(prev => [...prev, { ...DEFAULT_CHARACTER, id: crypto.randomUUID() }]);
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleOutputChange = (value: string) => {
    setOutputs(prev => prev.includes(value) ? prev.filter(o => o !== value) : [...prev, value]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResults(null);
    try {
      const resultFiles = await generateDubbing({
        url,
        sourceLanguage,
        targetLanguage,
        dialect,
        localization,
        outputs,
        characters,
      });
      setResults(resultFiles);
    } catch (error) {
      console.error("Dubbing generation failed:", error);
      // Here you could set an error state to show in the UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-text mb-2 tracking-tight">AI Video Dubbing Studio</h1>
          <p className="text-lg text-brand-text-secondary">Translate and dub videos with nuanced voice personas and perfect timing.</p>
        </header>

        <main className="space-y-8">
          <InputSection
            url={url} setUrl={setUrl}
            sourceLanguage={sourceLanguage} setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage} setTargetLanguage={setTargetLanguage}
            dialect={dialect} setDialect={setDialect}
            localization={localization} setLocalization={setLocalization}
            outputs={outputs} handleOutputChange={handleOutputChange}
            languages={LANGUAGES}
            outputFormats={OUTPUT_FORMATS}
          />

          <CharacterMapping
            characters={characters}
            onCharacterChange={handleCharacterChange}
            onAddCharacter={addCharacter}
            onRemoveCharacter={removeCharacter}
          />

          <div className="flex justify-center pt-4">
            <Button onClick={handleSubmit} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Icon name="spinner" className="animate-spin mr-2" />
                  Generating Dub...
                </>
              ) : (
                <>
                  <Icon name="play" className="mr-2" />
                  Generate Dubbing
                </>
              )}
            </Button>
          </div>
          
          {(isLoading || results) && (
            <OutputSection isLoading={isLoading} results={results} />
          )}
        </main>
        
        <footer className="text-center mt-12 text-brand-text-secondary text-sm">
            <p>&copy; {new Date().getFullYear()} AI Video Dubbing Studio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
