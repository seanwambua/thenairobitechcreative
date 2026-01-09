'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialProjects, type Project as ProjectType } from '@/lib/data';

export type Project = ProjectType;

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (updatedProject: Project) => void;
  deleteProject: (projectId: number) => void;
}

export const useProjectStore = create(
  persist<ProjectState>(
    (set) => ({
      projects: initialProjects,
      addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
      updateProject: (updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
          ),
        })),
      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== projectId),
        })),
    }),
    {
      name: 'project-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
