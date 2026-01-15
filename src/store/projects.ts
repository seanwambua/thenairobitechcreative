'use client';
import { create } from 'zustand';
import { type Project as ProjectType } from '@/lib/data';

interface ProjectState {
  projects: ProjectType[];
  isLoading: boolean;
  error: string | null;
  setProjects: (projects: ProjectType[]) => void;
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (updatedProject: ProjectType) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  setProjects: (projects) => set({ projects }),
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      set({ projects, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  addProject: async (project) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error('Failed to create project');
      const newProject = await response.json();
      set((state) => ({
        projects: [newProject, ...state.projects],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updateProject: async (updatedProject) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) throw new Error('Failed to update project');
      const result = await response.json();
      set((state) => ({
        projects: state.projects.map((p) => (p.id === updatedProject.id ? result : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deleteProject: async (projectId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
