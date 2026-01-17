'use client';
import { create } from 'zustand';
import { placeholderImages } from '@/lib/placeholder-images';
import { postBroadcastMessage } from '@/hooks/use-broadcast';

interface MediaState {
  heroImage: string;
  setHeroImage: (imageUrl: string) => void;
  logo: string | null;
  setLogo: (logoUrl: string | null) => void;
  founderImage: string | null;
  setFounderImage: (imageUrl: string | null) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  heroImage: placeholderImages.hero.imageUrl,
  setHeroImage: (imageUrl) => {
    set({ heroImage: imageUrl });
    postBroadcastMessage({ type: 'update-media', payload: { heroImage: imageUrl } });
  },
  logo: null,
  setLogo: (logoUrl) => {
    set({ logo: logoUrl });
    postBroadcastMessage({ type: 'update-media', payload: { logo: logoUrl } });
  },
  founderImage: null,
  setFounderImage: (imageUrl) => {
    set({ founderImage: imageUrl });
    postBroadcastMessage({ type: 'update-media', payload: { founderImage: imageUrl } });
  },
}));
