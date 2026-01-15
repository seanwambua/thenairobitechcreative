'use client';
import { create } from 'zustand';
import { type Post as PostType } from '@/lib/data';

export interface Post extends Omit<PostType, 'comments'> {
  comments?: any[]; // Allow comments to be optional or different type
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePost: (updatedPost: Post) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const posts = await response.json();
      set({ posts, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  addPost: async (post) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      set((state) => ({
        posts: [newPost, ...state.posts],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updatePost: async (updatedPost) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/posts/${updatedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) throw new Error('Failed to update post');
      const result = await response.json();
      set((state) => ({
        posts: state.posts.map((p) => (p.id === updatedPost.id ? result : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deletePost: async (postId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete post');
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== postId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
