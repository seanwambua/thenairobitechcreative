'use client';
import { useEffect, useCallback } from 'react';

const CHANNEL_NAME = 'ntc-broadcast-channel';
let channel: BroadcastChannel | null = null;

// Ensure channel is a singleton
const getChannel = () => {
  if (channel === null) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
  return channel;
};

interface BroadcastMessage {
  type: 'refetch-posts' | 'refetch-projects' | 'refetch-testimonials' | 'refetch-media';
}

export const postBroadcastMessage = (message: BroadcastMessage) => {
  getChannel().postMessage(message);
};

export const useBroadcastListener = (
  onMessage: (event: MessageEvent<BroadcastMessage>) => void
) => {
  const handleMessage = useCallback(
    (event: MessageEvent<BroadcastMessage>) => {
      onMessage(event);
    },
    [onMessage]
  );

  useEffect(() => {
    const bc = getChannel();
    bc.addEventListener('message', handleMessage);
    return () => {
      bc.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);
};
