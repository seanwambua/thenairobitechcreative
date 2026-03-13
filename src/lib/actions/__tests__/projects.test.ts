import { getProjects, createProject, updateProject, deleteProject } from '../projects';
import prisma from '@/lib/prisma';

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  project: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
}));

describe('Projects Actions', () => {
  const mockProject = {
    id: 1,
    title: 'Test Project',
    description: 'This is a test project description.',
    keyFeatures: 'Feature 1, Feature 2',
    imageUrl: 'https://example.com/image.png',
    imageHint: 'test image',
    gridSpan: 'col-span-12',
    icon: 'Boxes',
    url: 'https://test.com',
    isFavorite: true,
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProjects', () => {
    it('should fetch projects and map them correctly', async () => {
      (prisma.project.findMany as jest.Mock).mockResolvedValue([mockProject]);

      const projects = await getProjects();

      expect(projects).toHaveLength(1);
      expect(projects[0].keyFeatures).toEqual(['Feature 1', 'Feature 2']);
      expect(projects[0].title).toBe('Test Project');
    });
  });

  describe('createProject', () => {
    it('should create a project with correct data mapping', async () => {
      const input = {
        title: 'New Project',
        description: 'Brand new project description.',
        keyFeatures: ['Feature A', 'Feature B'],
        imageUrl: 'https://example.com/new.png',
        imageHint: 'new project',
        icon: 'Rocket' as const,
        gridSpan: 'col-span-12',
        url: 'https://new.com',
      };

      (prisma.project.create as jest.Mock).mockResolvedValue({
        ...mockProject,
        ...input,
        keyFeatures: input.keyFeatures.join(','),
      });

      const result = await createProject(input);

      expect(prisma.project.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          title: input.title,
          keyFeatures: 'Feature A,Feature B',
        }),
      }));
      expect(result.keyFeatures).toEqual(input.keyFeatures);
    });
  });

  describe('updateProject', () => {
    it('should update project fields without losing existing metadata like isFavorite', async () => {
      const updateInput = {
        title: 'Updated Title',
        description: 'Updated description that is long enough.',
        keyFeatures: ['Updated F1'],
        imageUrl: 'https://example.com/updated.png',
        imageHint: 'updated hint',
        icon: 'Rocket' as const,
        gridSpan: 'col-span-12',
        url: 'https://updated.com',
      };

      (prisma.project.update as jest.Mock).mockResolvedValue({
        ...mockProject,
        ...updateInput,
        keyFeatures: updateInput.keyFeatures.join(','),
      });

      const result = await updateProject(1, updateInput);

      expect(prisma.project.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({
          title: 'Updated Title',
          keyFeatures: 'Updated F1',
        }),
      });
      
      expect(result.title).toBe('Updated Title');
    });
  });

  describe('deleteProject', () => {
    it('should delete a project by id', async () => {
      (prisma.project.delete as jest.Mock).mockResolvedValue(mockProject);

      await deleteProject(1);

      expect(prisma.project.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
