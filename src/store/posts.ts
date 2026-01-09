'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { posts as initialPostsData, type Post as PostType } from '@/lib/data';

export type Post = PostType;

interface PostState {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (postId: number) => void;
}

export const usePostStore = create(
  persist<PostState>(
    (set) => ({
      posts: initialPostsData,
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (updatedPost) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          ),
        })),
      deletePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
    }),
    {
      name: 'post-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
