
'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { placeholderImages } from '@/lib/placeholder-images';

interface MediaState {
  heroImage: string;
  setHeroImage: (imageUrl: string) => void;
  logo: string | null;
  setLogo: (logoUrl: string | null) => void;
  founderImage: string | null;
  setFounderImage: (imageUrl: string | null) => void;
}

export const useMediaStore = create(
  persist<MediaState>(
    (set) => ({
      heroImage: placeholderImages.hero.imageUrl,
      setHeroImage: (imageUrl) => set({ heroImage: imageUrl }),
      logo: null,
      setLogo: (logoUrl) => set({ logo: logoUrl }),
      founderImage: null,
      setFounderImage: (imageUrl) => set({ founderImage: imageUrl }),
    }),
    {
      name: 'media-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
