'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useProjectStore, type Project } from '@/store/projects';
import { placeholderImages } from '@/lib/placeholder-images';
import { iconNames } from '@/lib/data';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  keyFeatures: z.string().min(3, 'Please add at least one key feature.'),
  icon: z.enum(iconNames),
  gridSpan: z.string().min(1),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project: Project | null;
}

export function ProjectEditorSheet({ isOpen, setIsOpen, project }: ProjectEditorSheetProps) {
  const { toast } = useToast();
  const { addProject, updateProject } = useProjectStore();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      keyFeatures: '',
      icon: 'Boxes',
      gridSpan: 'col-span-1 md:col-span-1',
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        description: project.description,
        keyFeatures: project.keyFeatures.join(', '),
        icon: project.icon,
        gridSpan: project.gridSpan,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        keyFeatures: '',
        icon: 'Boxes',
        gridSpan: 'col-span-1 md:col-span-1',
      });
    }
  }, [project, form, isOpen]);

  function onSubmit(values: ProjectFormValues) {
    const keyFeatures = values.keyFeatures.split(',').map((s) => s.trim());

    if (project) {
      // Update existing project
      const updatedProject: Project = {
        ...project,
        ...values,
        keyFeatures,
      };
      updateProject(updatedProject);
      toast({
        title: 'Project Updated!',
        description: `"${values.title}" has been successfully updated.`,
      });
    } else {
      // Create new project
      const newProject: Project = {
        id: Date.now(),
        ...values,
        keyFeatures,
        imageUrl: placeholderImages.enterpriseB.imageUrl,
        imageHint: 'abstract network',
      };
      addProject(newProject);
      toast({
        title: 'Project Created!',
        description: `"${values.title}" has been successfully created.`,
      });
    }

    form.reset();
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{project ? 'Edit Project' : 'Create New Project'}</SheetTitle>
          <SheetDescription>
            {project
              ? 'Make changes to your existing project.'
              : 'Fill out the details for your new portfolio project.'}
          </SheetDescription>
        </SheetHeader>
        <div className="py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short summary of the project"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keyFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter features, separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {iconNames.map((iconName) => (
                            <SelectItem key={iconName} value={iconName}>
                              {iconName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="gridSpan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grid Span</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grid span" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="col-span-1 md:col-span-1">Small</SelectItem>
                           <SelectItem value="col-span-1 md:col-span-2">Medium</SelectItem>
                           <SelectItem value="col-span-1 md:col-span-3">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit">Save Project</Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
