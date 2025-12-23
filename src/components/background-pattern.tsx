'use client';

import { useState, useEffect } from 'react';
import { generateBackgroundTexture } from '@/ai/flows/background-texture-generator';

export default function BackgroundPattern() {
  const [textureUri, setTextureUri] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTexture() {
      try {
        const result = await generateBackgroundTexture();
        if (result.textureDataUri) {
          setTextureUri(result.textureDataUri);
        }
      } catch (error) {
        console.error('Failed to generate background texture:', error);
      }
    }

    fetchTexture();
  }, []);

  if (!textureUri) {
    return null;
  }

  return (
    <style jsx global>{`
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: url('${textureUri}');
        opacity: 0.03;
        z-index: -1;
        pointer-events: none;
      }
    `}</style>
  );
}
