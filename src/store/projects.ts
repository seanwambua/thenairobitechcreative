'use client';
import { create } from 'zustand';
import { type Project as ProjectType } from '@/lib/data';
import { 
    getProjects,
    createProject as createProjectAction, 
    updateProject as updateProjectAction,
    deleteProject as deleteProjectAction 
} from '@/app/actions/projects';
import { ProjectSchemaType } from '@/lib/schemas';
import { postBroadcastMessage } from '@/hooks/use-broadcast';


interface ProjectState {
  projects: ProjectType[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<ProjectSchemaType, 'id' | 'createdAt' | 'updatedAt' >) => Promise<void>;
  updateProject: (updatedProject: ProjectType) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
  setProjects: (projects: ProjectType[]) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  setProjects: (projects) => set({ projects, isLoading: false, error: null }),
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
        const projects = await getProjects();
        set({ projects, isLoading: false, error: null });
    } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
    }
  },
  addProject: async (project) => {
    set({ isLoading: true });
    try {
      await createProjectAction(project);
      await get().fetchProjects();
      postBroadcastMessage({ type: 'refetch-projects' });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
  updateProject: async (updatedProject) => {
    set({ isLoading: true });
    try {
      await updateProjectAction(updatedProject);
      await get().fetchProjects();
      postBroadcastMessage({ type: 'refetch-projects' });
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
      postBroadcastMessage({ type: 'refetch-projects' });
    } catch (error) {
      set({ projects: originalProjects, error: (error as Error).message });
      throw error;
    }
  },
}));
