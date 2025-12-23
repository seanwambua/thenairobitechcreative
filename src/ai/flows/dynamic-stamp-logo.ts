'use server';

/**
 * @fileOverview Generates a dynamic stamp logo with a tribal pattern for the Nairobi Tech Creative website.
 *
 * - generateDynamicStampLogo - A function that generates the dynamic stamp logo SVG data URI.
 * - DynamicStampLogoOutput - The output type for the generateDynamicStampLogo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicStampLogoOutputSchema = z.object({
  svgDataUri: z
    .string()
    .describe(
      'The SVG data URI representing the dynamic stamp logo with animated tribal patterns.'
    ),
});
export type DynamicStampLogoOutput = z.infer<typeof DynamicStampLogoOutputSchema>;

export async function generateDynamicStampLogo(): Promise<DynamicStampLogoOutput> {
  return dynamicStampLogoFlow();
}

const dynamicStampLogoFlow = ai.defineFlow(
  {
    name: 'dynamicStampLogoFlow',
    outputSchema: DynamicStampLogoOutputSchema,
  },
  async () => {
    // Define the SVG content with animated tribal patterns using Framer Motion.
    const svgContent = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.5 50C12.5 29.2893 29.2893 12.5 50 12.5C70.7107 12.5 87.5 29.2893 87.5 50C87.5 70.7107 70.7107 87.5 50 87.5C29.2893 87.5 12.5 70.7107 12.5 50Z" fill="#f97316"/>
  <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z" fill="#eab308"/>
  <path d="M27.5 50C27.5 37.6193 37.6193 27.5 50 27.5C62.3807 27.5 72.5 37.6193 72.5 50C72.5 62.3807 62.3807 72.5 50 72.5C37.6193 72.5 27.5 62.3807 27.5 50Z" fill="#18181b"/>
  <!-- Animated tribal patterns would be added here using Framer Motion -->
  <circle cx="50" cy="50" r="20" fill="white" />
</svg>`;

    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

    return {svgDataUri};
  }
);
