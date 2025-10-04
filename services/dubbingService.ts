
import { GoogleGenAI, Type } from "@google/genai";
import type { DubbingOptions, ResultFiles } from '../types';

// A mock transcript for the default video URL (Rick Astley - Never Gonna Give You Up)
const RICK_ASTLEY_TRANSCRIPT = `
[00:00:11.410 --> 00:00:14.410] Host: We're no strangers to love
[00:00:14.410 --> 00:00:18.410] Host: You know the rules and so do I
[00:00:18.410 --> 00:00:22.410] Host: A full commitment's what I'm thinking of
[00:00:22.410 --> 00:00:25.410] Host: You wouldn't get this from any other guy
`;

const GENERIC_TRANSCRIPT = `
[00:00:01.000 --> 00:00:04.000] Speaker 1: Hello, and welcome to our presentation.
[00:00:04.500 --> 00:00:07.000] Speaker 2: We're excited to share our findings with you today.
[00:00:07.500 --> 00:00:10.000] Speaker 1: Let's begin with the first topic.
`;

export const generateDubbing = async (options: DubbingOptions): Promise<ResultFiles> => {
  console.log("Starting dubbing process with options:", options);
  
  const transcript = options.url.includes('dQw4w9WgXcQ') 
    ? RICK_ASTLEY_TRANSCRIPT 
    : GENERIC_TRANSCRIPT;

  const characterMappingPrompt = options.characters.map(char => `
- Label: ${char.label} -> Voice Persona: "${char.persona}", Gender: ${char.gender}, Age: ${char.age}, Tone: ${char.tone}`).join('');
  
  const requestedTextOutputs = options.outputs.filter(o => o.endsWith('.txt') || o.endsWith('.srt'));

  // If no text outputs are requested, no need to call the API.
  if (requestedTextOutputs.length === 0) {
    console.log("No text outputs requested. Simulating delay and returning mock URLs for media.");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      audioUrl: options.outputs.includes('dubbed_audio.mp3') ? '/mock/dubbed_audio.mp3' : undefined,
      videoUrl: options.outputs.includes('dubbed_video.mp4') ? '/mock/dubbed_video.mp4' : undefined,
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const schemaProperties: { [key: string]: object } = {};
  // Using keys without dots as it can sometimes cause issues in API schemas.
  if (options.outputs.includes('subtitles.srt')) {
    schemaProperties['subtitles_srt'] = { type: Type.STRING, description: "Content of the SRT subtitles file in the target language. Should be null if not requested." };
  }
  if (options.outputs.includes('transcript_speakers.txt')) {
    schemaProperties['transcript_speakers_txt'] = { type: Type.STRING, description: "Content of the speaker-labeled transcript file in the source language. Should be null if not requested." };
  }
  if (options.outputs.includes('translation_notes.txt')) {
    schemaProperties['translation_notes_txt'] = { type: Type.STRING, description: "Content of the translation notes file. Should be null if not requested." };
  }

  const schema = {
    type: Type.OBJECT,
    properties: schemaProperties,
  };

  const fullPrompt = `
  **Task: Video Transcript Processing for Localization**

  **Source Video Context:**
  - URL: ${options.url} (Note: You cannot access this URL. Use the provided transcript below.)
  - Source Language: ${options.sourceLanguage}
  - Target Language: ${options.targetLanguage}
  - Localization Preference: ${options.localization}

  **Character & Voice Mapping:**
  ${characterMappingPrompt}

  **Source Transcript:**
  ---
  ${transcript}
  ---

  **Instructions:**
  Based on the provided transcript, character mapping, and localization preference, generate the content for the following requested files. If a file is NOT in the 'Requested Outputs' list, its corresponding JSON property must be null. The property names in your JSON response MUST match the keys in the response schema exactly (e.g., 'subtitles_srt').

  1.  **'transcript_speakers_txt':** Re-format the source transcript using the 'Label' from the character mapping. If the transcript has generic speaker labels like "Speaker 1", map them to the provided character labels sequentially.
  2.  **'subtitles_srt':** Translate the entire transcript into the target language ('${options.targetLanguage}') and format it as a valid SRT file. Preserve or create realistic timestamps.
  3.  **'translation_notes_txt':** Write brief notes about translation choices, especially for idioms or cultural references, guided by the '${options.localization}' preference.

  **Requested Outputs:**
  ${requestedTextOutputs.join(', ')}

  **Output Format:**
  You must return ONLY a single, valid JSON object that conforms to the provided schema. Do not include any other text or formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const generatedContent = JSON.parse(response.text);
    const resultFiles: ResultFiles = {};

    if (generatedContent['subtitles_srt'] && options.outputs.includes('subtitles.srt')) {
      const blob = new Blob([generatedContent['subtitles_srt']], { type: 'text/plain;charset=utf-8' });
      resultFiles.srtUrl = URL.createObjectURL(blob);
    }
    if (generatedContent['transcript_speakers_txt'] && options.outputs.includes('transcript_speakers.txt')) {
      const blob = new Blob([generatedContent['transcript_speakers_txt']], { type: 'text/plain;charset=utf-8' });
      resultFiles.transcriptUrl = URL.createObjectURL(blob);
    }
    if (generatedContent['translation_notes_txt'] && options.outputs.includes('translation_notes.txt')) {
      const blob = new Blob([generatedContent['translation_notes_txt']], { type: 'text/plain;charset=utf-8' });
      resultFiles.notesUrl = URL.createObjectURL(blob);
    }

    // Add mock URLs for media files if they were requested, as these can't be generated on the frontend
    if (options.outputs.includes('dubbed_audio.mp3')) {
        resultFiles.audioUrl = '/mock/dubbed_audio.mp3';
    }
    if (options.outputs.includes('dubbed_video.mp4')) {
        resultFiles.videoUrl = '/mock/dubbed_video.mp4';
    }

    console.log("Gemini processing complete. Returning results:", resultFiles);
    return resultFiles;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};
