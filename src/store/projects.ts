'use client';
import { create } from 'zustand';
import { type Project as ProjectType, initialProjects } from '@/lib/data';
import { 
    createProject, 
    updateProject as updateProjectAction,
    deleteProject as deleteProjectAction 
} from '@/app/actions/projects';


interface ProjectState {
  projects: ProjectType[];
  isLoading: boolean;
  error: string | null;
  setProjects: (projects: ProjectType[]) => void;
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt' >) => Promise<void>;
  updateProject: (updatedProject: ProjectType) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
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
      if (projects.length === 0) {
        set({ projects: initialProjects, isLoading: false });
      } else {
        set({ projects, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, projects: initialProjects });
    }
  },
  addProject: async (project) => {
    set({ isLoading: true });
    try {
      const newProject = await createProject(project);
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
      const returnedProject = await updateProjectAction(updatedProject);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === returnedProject.id ? returnedProject : p
        ),
        isLoading: false,
      }));
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
