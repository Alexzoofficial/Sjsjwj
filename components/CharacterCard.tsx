
import React from 'react';
import type { Character } from '../types';
import { Input } from './common/Input';
import { Select } from './common/Select';
import { Button } from './common/Button';
import { Icon } from './common/Icon';

interface CharacterCardProps {
  character: Character;
  onCharacterChange: (character: Character) => void;
  onRemoveCharacter: (id: string) => void;
  characterNumber: number;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onCharacterChange, onRemoveCharacter, characterNumber }) => {
  const handleChange = (field: keyof Character, value: string) => {
    onCharacterChange({ ...character, [field]: value });
  };

  return (
    <div className="p-4 bg-brand-secondary rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-lg text-brand-text">Character {characterNumber}</h4>
        <Button onClick={() => onRemoveCharacter(character.id)} variant="danger" size="sm">
            <Icon name="trash" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          label="Label"
          id={`label-${character.id}`}
          value={character.label}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="e.g., Host, Narrator"
        />
        <Select
          label="Gender"
          id={`gender-${character.id}`}
          value={character.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'neutral', label: 'Neutral' },
          ]}
        />
        <Input
          label="Age Range"
          id={`age-${character.id}`}
          value={character.age}
          onChange={(e) => handleChange('age', e.target.value)}
          placeholder="e.g., 25-35"
        />
         <Input
          label="Voice Persona"
          id={`persona-${character.id}`}
          value={character.persona}
          onChange={(e) => handleChange('persona', e.target.value)}
          placeholder="e.g., warm, mature male"
          className="md:col-span-2 lg:col-span-1"
        />
        <Input
          label="Tone"
          id={`tone-${character.id}`}
          value={character.tone}
          onChange={(e) => handleChange('tone', e.target.value)}
          placeholder="e.g., enthusiastic, calm"
          className="md:col-span-2 lg:col-span-2"
        />
      </div>
    </div>
  );
};
