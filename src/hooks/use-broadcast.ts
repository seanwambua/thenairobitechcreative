'use client';

import { useEffect, useCallback } from 'react';

// A generic structure for broadcast messages
export interface BroadcastMessage<T> {
  type: string;
  payload?: T;
}

const APP_CHANNEL_NAME = 'ntc-sync';
let channel: BroadcastChannel | null = null;

const getChannel = (): BroadcastChannel => {
  if (typeof window === 'undefined') {
    // Return a mock for SSR to prevent errors
    return {
      postMessage: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any;
  }
  if (channel === null) {
    channel = new BroadcastChannel(APP_CHANNEL_NAME);
  }
  return channel;
};

// Standalone function for use in non-component files like Zustand stores
export const postBroadcastMessage = <T,>(message: BroadcastMessage<T>) => {
  getChannel().postMessage(message);
};

// React hook for components to listen for broadcast messages
export const useBroadcastListener = <T,>(
  onMessage: (message: BroadcastMessage<T>) => void
) => {
  const stableOnMessage = useCallback(onMessage, [onMessage]);

  useEffect(() => {
    const channelInstance = getChannel();

    const handleMessage = (event: MessageEvent<BroadcastMessage<T>>) => {
      stableOnMessage(event.data);
    };

    channelInstance.addEventListener('message', handleMessage);

    return () => {
      channelInstance.removeEventListener('message', handleMessage);
    };
  }, [stableOnMessage]);
};
