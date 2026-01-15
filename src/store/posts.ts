'use client';
import { create } from 'zustand';
import { type Post as PostType } from '@prisma/client';
import {
  getPosts,
  createPost as createPostAction,
  updatePost as updatePostAction,
  deletePost as deletePostAction,
} from '@/app/actions/posts';

export interface Post extends PostType {}

type CreatePost = Pick<Post, 'title' | 'description' | 'content' | 'author'>;

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: CreatePost) => Promise<void>;
  updatePost: (updatedPost: Post) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const posts = await getPosts();
      set({ posts, isLoading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  addPost: async (post) => {
    set({ isLoading: true });
    try {
      await createPostAction(post);
      await get().fetchPosts(); // Re-fetch to get the latest list
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updatePost: async (updatedPost) => {
    set({ isLoading: true });
    try {
      await updatePostAction(updatedPost);
      await get().fetchPosts(); // Re-fetch to get the latest list
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deletePost: async (postId) => {
    const originalPosts = get().posts;
    // Optimistically update the UI
    set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) }));
    try {
      await deletePostAction(postId);
      await get().fetchPosts(); // Re-fetch to confirm deletion and get latest list
    } catch (error) {
      // Revert if the deletion fails
      set({ posts: originalPosts, error: (error as Error).message });
      throw error;
    }
  },
}));
