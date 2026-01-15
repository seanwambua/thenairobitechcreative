'use client';

import { useEffect } from 'react';
import { usePostStore } from '@/store/posts';
import { useProjectStore } from '@/store/projects';
import { useTestimonialStore } from '@/store/testimonials';

type BroadcastMessage = 
  | { type: 'refetch_posts' }
  | { type: 'refetch_projects' }
  | { type: 'refetch_testimonials' };


export function useBroadcast() {
  const { fetchPosts } = usePostStore();
  const { fetchProjects } = useProjectStore();
  const { fetchTestimonials } = useTestimonialStore();

  useEffect(() => {
    const channel = new BroadcastChannel('app-data-channel');

    const handleMessage = (event: MessageEvent<BroadcastMessage>) => {
      switch (event.data.type) {
        case 'refetch_posts':
          console.log('Refetching posts due to broadcast message...');
          fetchPosts();
          break;
        case 'refetch_projects':
          console.log('Refetching projects due to broadcast message...');
          fetchProjects();
          break;
        case 'refetch_testimonials':
           console.log('Refetching testimonials due to broadcast message...');
          fetchTestimonials();
          break;
        default:
          // Ignore unknown messages
          break;
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [fetchPosts, fetchProjects, fetchTestimonials]);
}
