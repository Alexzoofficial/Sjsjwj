
import React from 'react';
import type { Character } from '../types';
import { CharacterCard } from './CharacterCard';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Icon } from './common/Icon';

interface CharacterMappingProps {
  characters: Character[];
  onCharacterChange: (character: Character) => void;
  onAddCharacter: () => void;
  onRemoveCharacter: (id: string) => void;
}

export const CharacterMapping: React.FC<CharacterMappingProps> = ({ characters, onCharacterChange, onAddCharacter, onRemoveCharacter }) => {
  return (
    <Card title="2. Character & Voice Mapping" icon={<Icon name="microphone" />}>
      <div className="space-y-6">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            onCharacterChange={onCharacterChange}
            onRemoveCharacter={onRemoveCharacter}
            characterNumber={index + 1}
          />
        ))}
        <div className="pt-4">
          <Button onClick={onAddCharacter} variant="secondary">
            <Icon name="plus" className="mr-2" />
            Add Character
          </Button>
        </div>
      </div>
    </Card>
  );
};
