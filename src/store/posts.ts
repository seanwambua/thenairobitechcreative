'use client';
import { create } from 'zustand';
import { type Post as PostType } from '@prisma/client';
import { initialPosts } from '@/lib/data';
import {
  createPost,
  updatePost as updatePostAction,
  deletePost as deletePostAction,
} from '@/app/actions/posts';

export interface Post extends PostType {}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'likes' | 'date'>) => Promise<void>;
  updatePost: (updatedPost: Post) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  setPosts: (posts) => set({ posts }),
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      let posts = await response.json();

      if (posts.length === 0) {
        posts = initialPosts;
      }
      
      set({ posts, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, posts: initialPosts });
    }
  },
  addPost: async (post) => {
    set({ isLoading: true });
    try {
      const newPost = await createPost(post);
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
      const returnedPost = await updatePostAction(updatedPost);
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === returnedPost.id ? { ...p, ...returnedPost } : p
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deletePost: async (postId) => {
    const originalPosts = get().posts;
    set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) }));
    try {
      await deletePostAction(postId);
    } catch (error) {
      set({ posts: originalPosts, error: (error as Error).message });
      throw error;
    }
  },
}));

    