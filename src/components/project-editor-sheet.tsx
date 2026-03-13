'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
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
import placeholderImages from '@/lib/placeholder-images.json';
import { type Project } from '@/lib/actions/projects';
import { Upload, Loader2, Link as LinkIcon } from 'lucide-react';
import { ProjectSchema, iconNames } from '@/lib/schemas';
import { createProject, updateProject } from '@/lib/actions/projects';
import { CldUploadWidget } from 'next-cloudinary';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = ProjectSchema.pick({
  title: true,
  description: true,
  icon: true,
  gridSpan: true,
  url: true,
}).extend({
  keyFeatures: z.string().min(3, 'Please add at least one key feature.'),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectEditorDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project: Project | null;
  onSave: () => void;
}

export function ProjectEditorDialog({
  isOpen,
  setIsOpen,
  project,
  onSave,
}: ProjectEditorDialogProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      keyFeatures: '',
      icon: 'Boxes',
      gridSpan: 'col-span-12',
      url: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (project) {
        form.reset({
          title: project.title,
          description: project.description,
          keyFeatures: project.keyFeatures.join(', '),
          icon: project.icon,
          gridSpan: project.gridSpan,
          url: project.url || '',
        });
        setImagePreview(project.imageUrl);
      } else {
        form.reset({
          title: '',
          description: '',
          keyFeatures: '',
          icon: 'Boxes',
          gridSpan: 'col-span-12',
          url: '',
        });
        setImagePreview(placeholderImages.enterpriseB.imageUrl);
      }
    }
  }, [project, form, isOpen]);

  const handleUploadSuccess = (result: any) => {
    const secure_url = result.info.secure_url;
    setImagePreview(secure_url);
    toast({
      title: 'Image Uploaded',
      description: 'The project image has been updated.',
    });
    setIsUploading(false);
  };

  async function onSubmit(values: ProjectFormValues) {
    setIsSaving(true);
    const projectData = {
      ...values,
      keyFeatures: values.keyFeatures.split(',').map((s) => s.trim()),
      imageUrl:
        imagePreview ||
        (project ? project.imageUrl : placeholderImages.enterpriseB.imageUrl),
      imageHint: project?.imageHint || 'abstract network',
    };

    try {
      if (project) {
        await updateProject(project.id, projectData);
      } else {
        await createProject(projectData);
      }

      toast({
        title: `Project ${project ? 'Updated' : 'Created'}!`,
        description: `"${values.title}" has been successfully saved.`,
      });
      onSave();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${project ? 'update' : 'create'} project.`,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[95vh] w-full max-w-4xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {project ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
          <DialogDescription>
            Configure the visual details and metadata for your portfolio item.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[70vh]">
              <div className="grid grid-cols-1 gap-8 px-6 py-4 lg:grid-cols-2">
                <div className="space-y-6">
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-inner">
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          alt="Project preview"
                          fill
                          className="object-cover transition-opacity group-hover:opacity-90"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <CldUploadWidget
                          uploadPreset="nairobi_techcreative"
                          onSuccess={handleUploadSuccess}
                          onUploadAdded={() => setIsUploading(true)}
                          onClose={() => setIsUploading(false)}
                          options={{ sources: ['local', 'url', 'unsplash'] }}
                        >
                          {({ open }) => (
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => open?.()}
                              disabled={isUploading}
                            >
                              <Upload className="mr-2 h-4 w-4" /> Change Image
                            </Button>
                          )}
                        </CldUploadWidget>
                      </div>
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project URL (optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://example.com" className="pl-9" {...field} />
                          </div>
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
                          <FormLabel>Display Icon</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select icon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {iconNames.map((name) => (
                                <SelectItem key={name} value={name}>{name}</SelectItem>
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
                          <FormLabel>Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="col-span-12">Full Width</SelectItem>
                              <SelectItem value="sm:col-span-2 lg:col-span-2">Medium</SelectItem>
                              <SelectItem value="col-span-1">Small</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title" {...field} />
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
                          <Textarea placeholder="What was this project about?" rows={5} {...field} />
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
                          <Input placeholder="Feature 1, Feature 2, Feature 3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="border-t p-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}