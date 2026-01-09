'use server';

/**
 * @fileOverview Generates a hero image for the Nairobi Tech Creative website.
 *
 * - generateHeroImage - A function that generates the hero image.
 * - HeroImageOutput - The output type for the generateHeroImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HeroImageOutputSchema = z.object({
  heroImageDataUri: z
    .string()
    .describe(
      "A hero image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type HeroImageOutput = z.infer<typeof HeroImageOutputSchema>;

export async function generateHeroImage(): Promise<HeroImageOutput> {
  return heroImageGeneratorFlow();
}

const heroImageGeneratorFlow = ai.defineFlow(
  {
    name: 'heroImageGeneratorFlow',
    outputSchema: HeroImageOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt:
        'A high-tech, futuristic cityscape in Nairobi, Kenya, with subtle African patterns integrated into the architecture. Golden hour lighting, cinematic quality.',
    });

    return {heroImageDataUri: media!.url!};
  }
);
