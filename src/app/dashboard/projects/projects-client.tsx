'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  PlusCircle, 
  LayoutDashboard, 
  Pencil, 
  Trash2, 
  ExternalLink,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProjectEditorDialog } from '@/components/project-editor-sheet';
import type { Project } from '@/lib/actions/projects';
import { deleteProject, toggleProjectFavorite } from '@/lib/actions/projects';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCreateNew = () => {
    setEditingProject(null);
    setEditorOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditorOpen(true);
  };

  const handleToggleFavorite = async (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsTogglingFavorite(project.id);
    try {
      const result = await toggleProjectFavorite(project.id);
      if (result.success) {
        toast({ title: 'Success', description: `Project ${!project.isFavorite ? 'added to' : 'removed from'} favorites.` });
        router.refresh();
      } else {
        toast({ variant: 'destructive', title: 'Limit Reached', description: result.error });
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Action failed.' });
    } finally {
      setIsTogglingFavorite(null);
    }
  };

  const handleDeleteInitiate = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      try {
        await deleteProject(projectToDelete.id);
        router.refresh();
        toast({
          title: 'Project Deleted',
          description: `"${projectToDelete.title}" has been successfully deleted.`,
        });
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete project.',
        });
      } finally {
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
      }
    }
  };

  const handleSave = () => {
    setEditorOpen(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </div>

      {initialProjects.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-8 text-center">
          <p className="text-lg font-medium text-muted-foreground">No projects found</p>
          <p className="mt-1 text-sm text-muted-foreground">Get started by creating your first portfolio item.</p>
          <Button onClick={handleCreateNew} variant="outline" className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {initialProjects.map((project) => (
            <Card key={project.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Favorite Toggle */}
                <div className="absolute left-2 top-2 z-10">
                  <Button
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "h-8 w-8 backdrop-blur-sm shadow-sm transition-colors",
                      project.isFavorite ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500" : "bg-white/80 hover:bg-white text-muted-foreground"
                    )}
                    onClick={(e) => handleToggleFavorite(e, project)}
                    disabled={isTogglingFavorite === project.id}
                  >
                    <Star className={cn("h-4 w-4", project.isFavorite && "fill-current")} />
                  </Button>
                </div>

                <div className="absolute right-2 top-2 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(project)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/projects/${project.id}`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Manage Roadmap
                        </Link>
                      </DropdownMenuItem>
                      {project.url && (
                        <DropdownMenuItem onClick={() => window.open(project.url!, '_blank')}>
                          <ExternalLink className="mr-2 h-4 w-4" /> View Live Site
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteInitiate(project)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="line-clamp-1 text-xl">{project.title}</CardTitle>
                  <Badge variant="secondary">{project.icon}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 pt-0">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.keyFeatures.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-[10px]">
                      {feature}
                    </Badge>
                  ))}
                  {project.keyFeatures.length > 3 && (
                    <Badge variant="outline" className="text-[10px]">
                      +{project.keyFeatures.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/5 p-4">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    Manage Project Structure
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ProjectEditorDialog
        isOpen={isEditorOpen}
        setIsOpen={setEditorOpen}
        project={editingProject}
        onSave={handleSave}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project titled &quot;
              {projectToDelete?.title}&quot; and all its associated milestones and tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
