'use client';
import { create } from 'zustand';
import { type Post as PostType } from '@prisma/client';
import {
  createPost,
  updatePost as updatePostAction,
  deletePost as deletePostAction,
} from '@/app/actions/posts';
import { PostSchema } from '@/lib/schemas';

export interface Post extends PostType {}

type CreatePost = Pick<Post, 'title' | 'description' | 'content' | 'author'>;

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  setPosts: (posts: Post[]) => void;
  addPost: (post: CreatePost) => Promise<void>;
  updatePost: (updatedPost: Post) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  setPosts: (posts) => set({ posts, isLoading: false, error: null }),
  addPost: async (post) => {
    set({ isLoading: true });
    try {
      // The server action will revalidate the path, causing the page to get new props
      await createPost(post);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updatePost: async (updatedPost) => {
    set({ isLoading: true });
    try {
      await updatePostAction(updatedPost);
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
    } catch (error) {
      // Revert if the deletion fails
      set({ posts: originalPosts, error: (error as Error).message });
      throw error;
    }
  },
}));
