'use server';

/**
 * @fileOverview Generates a subtle tribal background pattern as a data URI.
 *
 * - generateBackgroundTexture - A function that generates the background texture.
 * - BackgroundTextureOutput - The output type for the generateBackgroundTexture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BackgroundTextureOutputSchema = z.object({
  textureDataUri: z
    .string()
    .describe(
      "A seamless, subtle tribal background pattern as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type BackgroundTextureOutput = z.infer<typeof BackgroundTextureOutputSchema>;

export async function generateBackgroundTexture(): Promise<BackgroundTextureOutput> {
  return backgroundTextureGeneratorFlow();
}

const backgroundTextureGeneratorFlow = ai.defineFlow(
  {
    name: 'backgroundTextureGeneratorFlow',
    outputSchema: BackgroundTextureOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: 'subtle seamless african tribal pattern, repeatable texture',
    });

    return {textureDataUri: media!.url!};
  }
);
