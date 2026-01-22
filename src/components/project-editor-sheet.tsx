'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { placeholderImages } from '@/lib/placeholder-images';
import { type Project } from '@/lib/data';
import { Upload, Loader2 } from 'lucide-react';
import { ProjectSchema, iconNames } from '@/lib/schemas';
import { createProject, updateProject } from '@/app/actions/projects';
import { CldUploadButton } from 'next-cloudinary';
import { cn } from '@/lib/utils';

const formSchema = ProjectSchema.pick({
  title: true,
  description: true,
  keyFeatures: true,
  icon: true,
  gridSpan: true,
}).extend({
    keyFeatures: z.string().min(3, 'Please add at least one key feature.'),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project: Project | null;
  onSave: () => void;
}

export function ProjectEditorSheet({ isOpen, setIsOpen, project, onSave }: ProjectEditorSheetProps) {
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
      gridSpan: 'col-span-1 md:col-span-1',
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
        });
        setImagePreview(project.imageUrl);
      } else {
        form.reset({
          title: '',
          description: '',
          keyFeatures: '',
          icon: 'Boxes',
          gridSpan: 'col-span-1 md:col-span-1',
        });
        setImagePreview(placeholderImages.enterpriseB.imageUrl);
      }
    }
  }, [project, form, isOpen]);

  const handleUploadSuccess = (result: any) => {
    const secure_url = result.info.secure_url;
    setImagePreview(secure_url);
    toast({ title: 'Image Uploaded', description: 'The project image has been updated.' });
    setIsUploading(false);
  };

  async function onSubmit(values: ProjectFormValues) {
    setIsSaving(true);
    const projectData = {
      ...values,
      keyFeatures: values.keyFeatures.split(',').map((s) => s.trim()),
      imageUrl: imagePreview || (project ? project.imageUrl : placeholderImages.enterpriseB.imageUrl),
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Image and Details Section */}
              <div className="space-y-6 md:col-span-1">
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Project preview"
                        fill
                        className="object-cover"
                      />
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <CldUploadButton
                    uploadPreset="nairobi_techcreative"
                    onSuccess={handleUploadSuccess}
                    onUpload={() => setIsUploading(true)}
                    onError={(error) => {
                      setIsUploading(false);
                      toast({
                        variant: 'destructive',
                        title: 'Upload Failed',
                        description: String((error as any).info),
                      });
                    }}
                    className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                    disabled={isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </CldUploadButton>
                </FormItem>
              </div>

              {/* Form Fields Section */}
              <div className="space-y-6 md:col-span-2">
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
                          rows={3}
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
                        <Input placeholder="Enter features, separated by commas" {...field} />
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
                 <SheetFooter className="col-span-full mt-4">
                    <SheetClose asChild>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    </SheetClose>
                    <Button type="submit" disabled={isUploading || isSaving}>
                      {(isUploading || isSaving) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Project
                    </Button>
                </SheetFooter>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
