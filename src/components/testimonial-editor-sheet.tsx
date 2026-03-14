'use client';

import { useEffect, useState } from 'react';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@prisma/client';
import placeholderImages from '@/lib/placeholder-images.json';
import { Upload, Loader2, User as UserIcon, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TestimonialSchema } from '@/lib/schemas';
import {
  createTestimonial,
  updateTestimonial,
} from '@/lib/actions/testimonials';
import { CldUploadButton } from 'next-cloudinary';
import { cn } from '@/lib/utils';

const formSchema = TestimonialSchema.pick({
  quote: true,
  author: true,
  title: true,
});

type TestimonialFormValues = z.infer<typeof formSchema>;

interface TestimonialEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  testimonial: Testimonial | null;
  onSave: () => void;
}

export function TestimonialEditorSheet({
  isOpen,
  setIsOpen,
  testimonial,
  onSave,
}: TestimonialEditorSheetProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: '',
      author: '',
      title: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (testimonial) {
        form.reset({
          quote: testimonial.quote,
          author: testimonial.author,
          title: testimonial.title,
        });
        setImagePreview(testimonial.avatarUrl);
      } else {
        form.reset({
          quote: '',
          author: '',
          title: '',
        });
        setImagePreview(placeholderImages.testimonial1.imageUrl);
      }
    }
  }, [testimonial, form, isOpen]);

  const handleUploadSuccess = (result: any) => {
    const secure_url = result.info.secure_url;
    setImagePreview(secure_url);
    toast({
      title: 'Avatar Updated',
      description: 'The author profile image has been uploaded successfully.',
    });
    setIsUploading(false);
  };

  async function onSubmit(values: TestimonialFormValues) {
    setIsSaving(true);
    const testimonialData = {
      ...values,
      avatarUrl:
        imagePreview ||
        (testimonial
          ? testimonial.avatarUrl
          : placeholderImages.testimonial1.imageUrl),
      avatarHint: testimonial?.avatarHint || 'new user',
    };

    try {
      if (testimonial) {
        await updateTestimonial(testimonial.id, testimonialData);
      } else {
        await createTestimonial(testimonialData);
      }

      toast({
        title: `Testimonial ${testimonial ? 'Updated' : 'Created'}!`,
        description: `Your changes to the testimonial from "${values.author}" have been saved.`,
      });
      onSave();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${
          testimonial ? 'update' : 'create'
        } testimonial. Please try again.`,
      });
    } finally {
      setIsSaving(false);
    }
  }

  const quoteValue = form.watch('quote') || '';

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl border-l shadow-2xl">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold">
            {testimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
          </SheetTitle>
          <SheetDescription>
            {testimonial
              ? 'Refine the client story or update the profile details.'
              : 'Add a new voice to your portfolio. Share how your work made an impact.'}
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-muted/30 border border-dashed border-border/60">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src={imagePreview ?? undefined} alt="Avatar preview" />
                  <AvatarFallback className="bg-muted">
                    <UserIcon className="h-10 w-10 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xs">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <CldUploadButton
                  options={{
                    sources: ['local', 'url', 'unsplash'],
                    multiple: false,
                    styles: {
                      zIndex: 99999,
                    },
                  }}
                  uploadPreset="nairobi_techcreative"
                  onSuccess={handleUploadSuccess}
                  onUploadAdded={() => setIsUploading(true)}
                  onError={(error) => {
                    setIsUploading(false);
                    toast({
                      variant: 'destructive',
                      title: 'Upload Failed',
                      description: 'Could not upload the image. Please try again.',
                    });
                  }}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),
                    isUploading && 'opacity-50 pointer-events-none'
                  )}
                >
                  <Upload className="mr-2 h-3 w-3" />
                  Change Avatar
                </CldUploadButton>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                  Recommended: 400x400 JPG/PNG
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CEO, TechLead" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>The Success Story</FormLabel>
                    <span className={cn(
                      "text-[10px] font-mono",
                      quoteValue.length < 10 ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {quoteValue.length} chars
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="What did they say about the project?"
                      className="min-h-[150px] resize-none focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Testimonials work best when they focus on specific outcomes or the working experience.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="gap-3 sm:gap-0 pt-4 border-t">
              <SheetClose asChild>
                <Button type="button" variant="ghost">
                  Discard
                </Button>
              </SheetClose>
              <Button
                type="submit"
                disabled={isUploading || isSaving}
                className="min-w-[140px]"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="mr-2 h-4 w-4" />
                )}
                {testimonial ? 'Update Entry' : 'Publish Entry'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
