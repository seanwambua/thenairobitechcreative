'use client';
import { create } from 'zustand';
import { type Project as ProjectType } from '@/lib/data';
import { 
    createProject, 
    updateProject as updateProjectAction,
    deleteProject as deleteProjectAction 
} from '@/app/actions/projects';
import { ProjectSchemaType } from '@/lib/schemas';


interface ProjectState {
  projects: ProjectType[];
  isLoading: boolean;
  error: string | null;
  setProjects: (projects: ProjectType[]) => void;
  addProject: (project: Omit<ProjectSchemaType, 'id' | 'createdAt' | 'updatedAt' >) => Promise<void>;
  updateProject: (updatedProject: ProjectType) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  setProjects: (projects) => set({ projects, isLoading: false, error: null }),
  addProject: async (project) => {
    set({ isLoading: true });
    try {
      await createProject(project);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updateProject: async (updatedProject) => {
    set({ isLoading: true });
    try {
      await updateProjectAction(updatedProject);
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  deleteProject: async (projectId) => {
     const originalProjects = get().projects;
    set(state => ({ projects: state.projects.filter(p => p.id !== projectId) }));
    try {
      await deleteProjectAction(projectId);
    } catch (error) {
      set({ projects: originalProjects, error: (error as Error).message });
      throw error;
    }
  },
}));
