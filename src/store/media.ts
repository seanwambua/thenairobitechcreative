'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { placeholderImages } from '@/lib/placeholder-images';

interface MediaState {
  heroImage: string;
  setHeroImage: (imageUrl: string) => void;
  logo: string | null;
  setLogo: (logoUrl: string) => void;
}

export const useMediaStore = create(
  persist<MediaState>(
    (set) => ({
      heroImage: placeholderImages.hero.imageUrl,
      setHeroImage: (imageUrl) => set({ heroImage: imageUrl }),
      logo: null,
      setLogo: (logoUrl) => set({ logo: logoUrl }),
    }),
    {
      name: 'media-storage', // name of the item in the storage (must be unique)
    }
  )
);
