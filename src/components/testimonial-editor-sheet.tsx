'use client';

import { useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Testimonial } from '@prisma/client';
import { placeholderImages } from '@/lib/placeholder-images';
import { Upload, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TestimonialSchema } from '@/lib/schemas';
import { createTestimonial, updateTestimonial } from '@/app/actions/testimonials';
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
    toast({ title: 'Image Uploaded', description: 'The avatar has been updated.' });
    setIsUploading(false);
  };

  async function onSubmit(values: TestimonialFormValues) {
    setIsSaving(true);
    const testimonialData = {
        ...values,
        avatarUrl: imagePreview || (testimonial ? testimonial.avatarUrl : placeholderImages.testimonial1.imageUrl),
        avatarHint: testimonial?.avatarHint || 'new user',
    };

    try {
      if (testimonial) {
        await updateTestimonial({ ...testimonial, ...testimonialData });
      } else {
        await createTestimonial(testimonialData);
      }
      
      toast({
        title: `Testimonial ${testimonial ? 'Updated' : 'Created'}!`,
        description: `The testimonial from "${values.author}" has been successfully saved.`,
      });
      onSave();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${testimonial ? 'update' : 'create'} testimonial.`,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{testimonial ? 'Edit Testimonial' : 'Create New Testimonial'}</SheetTitle>
          <SheetDescription>
            {testimonial
              ? 'Make changes to this testimonial.'
              : 'Fill out the details for the new testimonial.'}
          </SheetDescription>
        </SheetHeader>
        <div className="py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormItem className="flex flex-col items-center text-center">
                  <FormLabel>Author Avatar</FormLabel>
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      {imagePreview && <AvatarImage src={imagePreview} alt="Avatar preview" />}
                      <AvatarFallback>
                        {form.getValues('author')?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
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
                    className={cn(buttonVariants({ variant: 'outline' }), 'mt-2')}
                    disabled={isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </CldUploadButton>
              </FormItem>

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author's name" {...field} />
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
                    <FormLabel>Author Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., CEO, Founder" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quote</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the testimonial quote here."
                        className="resize-y"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit" disabled={isUploading || isSaving}>
                  {(isUploading || isSaving) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Testimonial
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
