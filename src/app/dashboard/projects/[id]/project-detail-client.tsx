'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Clock, 
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createMilestone, deleteMilestone, updateMilestone } from '@/lib/actions/milestones';
import { createTask, deleteTask, updateTask } from '@/lib/actions/tasks';
import { MilestoneStatus, TaskStatus } from '@prisma/client';
import Link from 'next/link';

interface ProjectDetailClientProps {
  project: {
    id: number;
    title: string;
    description: string;
    milestones: any[];
  };
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAddMilestone = async () => {
    setIsLoading('milestone');
    try {
      await createMilestone(project.id, 'New Milestone', 'Enter a description here...');
      router.refresh();
      toast({ title: 'Milestone Created' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to create milestone.' });
    } finally {
      setIsLoading(null);
    }
  };

  const handleDeleteMilestone = async (id: number) => {
    setIsLoading(`delete-ms-${id}`);
    try {
      await deleteMilestone(id);
      router.refresh();
      toast({ title: 'Milestone Deleted' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete milestone.' });
    } finally {
      setIsLoading(null);
    }
  };

  const handleAddTask = async (milestoneId: number) => {
    setIsLoading(`task-${milestoneId}`);
    try {
      await createTask(milestoneId, 'New Task');
      router.refresh();
      toast({ title: 'Task Added' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add task.' });
    } finally {
      setIsLoading(null);
    }
  };

  const handleToggleTask = async (taskId: number, currentStatus: TaskStatus) => {
    const newStatus = currentStatus === 'DONE' ? TaskStatus.TODO : TaskStatus.DONE;
    try {
      await updateTask(taskId, { status: newStatus });
      router.refresh();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update task.' });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      router.refresh();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete task.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/projects">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
        <Button onClick={handleAddMilestone} disabled={!!isLoading}>
          {isLoading === 'milestone' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          Add Milestone
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Roadmap</CardTitle>
          <CardDescription>Break down the project into manageable milestones and tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          {project.milestones.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No milestones defined. Start by adding a milestone to your roadmap.
            </div>
          ) : (
            <Accordion type="multiple" className="w-full space-y-4">
              {project.milestones.map((ms) => (
                <AccordionItem key={ms.id} value={`ms-${ms.id}`} className="rounded-lg border px-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-1 items-center">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-lg font-semibold">{ms.title}</span>
                      </AccordionTrigger>
                      <Badge variant="outline" className="ml-4">
                        {ms.tasks.length} Tasks
                      </Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteMilestone(ms.id)}
                      disabled={isLoading === `delete-ms-${ms.id}`}
                    >
                      {isLoading === `delete-ms-${ms.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  <AccordionContent className="pb-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        {ms.tasks.map((task: any) => (
                          <div key={task.id} className="flex items-center justify-between rounded-md border bg-muted/30 p-3">
                            <div className="flex items-center gap-3">
                              <button onClick={() => handleToggleTask(task.id, task.status)}>
                                {task.status === 'DONE' ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                              </button>
                              <span className={task.status === 'DONE' ? 'text-muted-foreground line-through' : ''}>
                                {task.title}
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-dashed"
                        onClick={() => handleAddTask(ms.id)}
                        disabled={isLoading === `task-${ms.id}`}
                      >
                        {isLoading === `task-${ms.id}` ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                        Add Task
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
