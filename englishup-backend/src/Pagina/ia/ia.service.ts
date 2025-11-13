import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AiService {


  private models = [
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash-lite-001',
    'gemini-2.0-flash',
    'gemini-2.5-flash',
  ];

  async generateQuestions(topic:string): Promise<any[]> {
    const apiKey = process.env.GOOGLE_API_KEY;
    const randomSeed = Math.floor(Math.random() * 1000000);
    const prompt = `Create 10 unique multiple-choice questions in English about the "${topic}" tense. 
Each time, ensure different questions by using this seed: ${randomSeed}.
Each question must have 4 options. Mark the correct one with * at the beginning.
Return ONLY a valid JSON array, no additional text or markdown:
[
  {
    "id": 1,
    "question": "What ___ you ___ right now?",
    "options": ["*are/doing", "is/doing", "are/do", "do/doing"]
  }
]`;


    const errors: Array<{ model: string; status?: number; message?: string; error?: string }> = [];

    for (const model of this.models) {
      console.log(`🔄 Trying model: ${model}`);

      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

      try {
        const response = await axios.post(
          apiUrl,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            }
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 20000
          }
        );

        const text = response.data.candidates[0].content.parts[0].text;

        console.log(`✅ Success with model: ${model}`);

        let jsonText = text.trim();
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const json = JSON.parse(jsonMatch[0]);

          if (Array.isArray(json) && json.length > 0 && json[0].question && json[0].options) {
            console.log(`✅ Generated ${json.length} questions with ${model}`);
            return json;
          }
        }

        console.warn(`⚠️ Invalid JSON from ${model}, trying next model...`);
        errors.push({ model, error: 'Invalid JSON response' });
      } catch (err: any) {
        const status = err.response?.status;
        const errorMsg = err.response?.data?.error?.message || err.message;

        console.error(`❌ Error with ${model}:`, {
          status,
          message: errorMsg
        });

        errors.push({ model, status, message: errorMsg });

        // Si es 503 (sobrecarga), intentar con el siguiente modelo
        if (status === 503) {
          console.log(`⏭️ Model ${model} overloaded, trying next model...`);
          continue;
        }

        // Si es otro error, también intentar con el siguiente
        console.log(`⏭️ Error with ${model}, trying next model...`);
        continue;
      }
    }

    // Si todos los modelos fallaron, lanzar excepción
    console.error('❌ All models failed:', errors);
    throw new HttpException(
      {
        message: 'Unable to generate questions. All AI models are currently unavailable.',
        details: errors,
        suggestion: 'Please try again in a few moments.'
      },
      HttpStatus.SERVICE_UNAVAILABLE
    );
  }

   async generateWordsByTopic(topic: string): Promise<any[]> {
    const apiKey = process.env.GOOGLE_API_KEY;
    const randomSeed = Math.floor(Math.random() * 1000000);

    const prompt = `
Generate 10 vocabulary words related to the topic "${topic}".
Return ONLY a valid JSON array (no markdown, no text outside JSON) with the following format:
[
  {
    "word": "hotel",
    "meaning_es": "un lugar donde las personas se alojan temporalmente",
    "meaning_en": "a place where people stay temporarily",
    "pronunciation": "hoh-tel"
  }
]
Make sure all entries are unique and the JSON is valid.
Use this random seed to vary results: ${randomSeed}.
`;

    const errors: Array<{ model: string; status?: number; message?: string; error?: string }> = [];

    for (const model of this.models) {
      console.log(`🔄 Trying model: ${model}`);
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

      try {
        const response = await axios.post(
          apiUrl,
          {
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 2048,
            },
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 20000,
          },
        );

        const text = response.data.candidates[0].content.parts[0].text;
        console.log(`✅ Success with model: ${model}`);

        let jsonText = text.trim();
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const json = JSON.parse(jsonMatch[0]);

          if (
            Array.isArray(json) &&
            json.length === 10 &&
            json[0].word &&
            json[0].meaning_es &&
            json[0].meaning_en &&
            json[0].pronunciation
          ) {
            console.log(`✅ Generated ${json.length} words for topic "${topic}" using ${model}`);
            return json;
          }
        }

        console.warn(`⚠️ Invalid JSON from ${model}, trying next model...`);
        errors.push({ model, error: 'Invalid JSON response' });
      } catch (err: any) {
        const status = err.response?.status;
        const errorMsg = err.response?.data?.error?.message || err.message;

        console.error(`❌ Error with ${model}:`, { status, message: errorMsg });
        errors.push({ model, status, message: errorMsg });

        // Si es sobrecarga o error temporal, intenta con el siguiente modelo
        console.log(`⏭️ Trying next model after error in ${model}...`);
        continue;
      }
    }

    // Si todos los modelos fallan
    console.error('❌ All models failed:', errors);
    throw new HttpException(
      {
        message: 'Unable to generate words. All AI models are currently unavailable.',
        details: errors,
        suggestion: 'Please try again later.',
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

}