'use client';
import { create } from 'zustand';
import { getSetting, updateSetting } from '@/app/actions/settings';
import { postBroadcastMessage } from '@/hooks/use-broadcast';
import { placeholderImages } from '@/lib/placeholder-images';

interface MediaState {
  heroImage: string | null;
  logoUrl: string | null;
  founderImage: string | null;
  isLoading: boolean;
  error: string | null;
  fetchHeroImage: () => Promise<void>;
  fetchLogoUrl: () => Promise<void>;
  fetchFounderImage: () => Promise<void>;
  setHeroImage: (url: string | null) => Promise<void>;
  setLogoUrl: (url: string | null) => Promise<void>;
  setFounderImage: (url: string | null) => Promise<void>;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  heroImage: null,
  logoUrl: null,
  founderImage: null,
  isLoading: false,
  error: null,
  
  fetchHeroImage: async () => {
    set({ isLoading: true });
    try {
      const url = await getSetting('heroImage');
      set({ heroImage: url ?? placeholderImages.hero.imageUrl, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchLogoUrl: async () => {
    set({ isLoading: true });
    try {
      const url = await getSetting('logo');
      set({ logoUrl: url, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  fetchFounderImage: async () => {
    set({ isLoading: true });
    try {
      const url = await getSetting('founderImage');
      set({ founderImage: url ?? placeholderImages.founder.imageUrl, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  setHeroImage: async (url) => {
    set({ isLoading: true });
    try {
      await updateSetting('heroImage', url);
      set({ heroImage: url, isLoading: false, error: null });
      postBroadcastMessage({ type: 'refetch-media' });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  setLogoUrl: async (url) => {
    set({ isLoading: true });
    try {
      await updateSetting('logo', url);
      set({ logoUrl: url, isLoading: false, error: null });
      postBroadcastMessage({ type: 'refetch-media' });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  setFounderImage: async (url) => {
    set({ isLoading: true });
    try {
      await updateSetting('founderImage', url);
      set({ founderImage: url, isLoading: false, error: null });
      postBroadcastMessage({ type: 'refetch-media' });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
