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
    let prompt= ''
    if (topic !== "prueba") {
  prompt = `Create 10 unique multiple-choice questions in English about the "${topic}" tense.\nEach time, ensure different questions by using this seed: ${randomSeed}.\nEach question must have 4 options in random order. Indicate the correct answer by its index (starting from 0) in a field called correctIndex. Do NOT use asterisks or any other marks in the options.\nReturn ONLY a valid JSON array, no additional text or markdown:\n[\n  {\n    "id": 1,\n    "question": "What ___ you ___ right now?",\n    "options": ["are/doing", "is/doing", "are/do", "do/doing"],\n    "correctIndex": 0\n  }\n]`;
  } else {  
    prompt = `Create a comprehensive English placement test with 10 unique multiple-choice questions to determine the user's level (A1, A2, B1, B2, C1, C2).
      The questions must scale in difficulty as follows:
      - Questions 1-2: A1 (Basic grammar/vocab)
      - Questions 3-4: A2 (Simple past/comparatives)
      - Questions 5-6: B1 (Intermediate/Present Perfect)
      - Questions 7-8: B2 (Upper intermediate/Conditionals)
      - Question 9: C1 (Advanced/Inversions)
      - Question 10: C2 (Proficiency/Nuance/Idioms)
      
      Each question must have 4 options. Indicate the correct answer by its index (0-3) in "correctIndex". 
      Include a field "difficulty" (e.g., "B1") in each object.
      Use this seed for variety: ${randomSeed}.
      Return ONLY a valid JSON array, no markdown or extra text:
      [
        {
          "id": 1,
          "level": "A1",
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "correctIndex": 0
        }
      ]`;
  }

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
          let json = JSON.parse(jsonMatch[0]);
          if (Array.isArray(json) && json.length > 0 && json[0].question && json[0].options && typeof json[0].correctIndex === 'number') {
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
      
        if (status === 503) {
          console.log(`⏭️ Model ${model} overloaded, trying next model...`);
          continue;
        }
        
        console.log(`⏭️ Error with ${model}, trying next model...`);
        continue;
      }
    }
   
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
Genera 10 palabras de vocabulario relacionadas con el tema "${topic}".

DEVUELVE ÚNICAMENTE un array JSON válido (sin texto, sin markdown, sin comentarios fuera del JSON) con exactamente este formato:

[
  {
    "id": 1,
    "word": "hotel",
    "meaning_es": "un lugar donde las personas se alojan temporalmente",
    "meaning_en": "a place where people stay temporarily",
    "pronunciation": "/hoʊˈtɛl/",         // IPA: pronunciación EN INGLÉS (para que un hispanohablante aprenda a decir la palabra en inglés)
    "respelling_es": "joh-TEL"             // Transcripción en ortografía española (opcional, ayuda para hispanohablantes)
  }
]

REGLAS IMPORTANTES:
- Deben ser exactamente 10 entradas numeradas del 1 al 10 en "id".
- Todas las entradas deben ser únicas (no repetir palabras ni sinónimos evidentes).
- "meaning_en" debe usar inglés simple, adecuado para estudiantes.
- "meaning_es" debe explicar claramente en español.
- "pronunciation" debe contener **solo** la transcripción en **IPA** de la pronunciación en inglés (ejemplos válidos: "/əˈbaʊt/", "/ˈrɛl.eɪ.ʃənˌʃɪp/", "/ˈaɪsˌkriːm/", "/ˈwɪndoʊ/").
- Asegúrate de que la IPA sea **correcta y estándar** (si hay varias variantes, elige la pronunciación más común en inglés americano).
- Añade además "respelling_es" con una guía de lectura en ortografía española para ayudar a hispanohablantes a pronunciar la palabra (usa mayúsculas para sílabas tónicas, p. ej. "i-DAH" o "yo-TEL").
- No incluyas explicaciones, disclaimers ni texto fuera del JSON.
- Evita palabras extremadamente básicas repetidas (como "hotel", "food", "car") cuando ya hayan aparecido en ejemplos previos; busca variedad relevante al tema.
- Usa el seed aleatorio: ${randomSeed} (usa este número para variar resultados internamente si tu modelo lo soporta).

Si la salida no es JSON válido, devuelve solo el JSON en el siguiente intento — nada más.
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