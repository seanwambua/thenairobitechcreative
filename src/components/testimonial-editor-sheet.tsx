
'use client';

import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTestimonialStore, type Testimonial } from '@/store/testimonials';
import { placeholderImages } from '@/lib/placeholder-images';
import { Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const formSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters.'),
  author: z.string().min(2, 'Author name must be at least 2 characters.'),
  title: z.string().min(3, 'Author title must be at least 3 characters.'),
});

type TestimonialFormValues = z.infer<typeof formSchema>;

interface TestimonialEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  testimonial: Testimonial | null;
}

export function TestimonialEditorSheet({
  isOpen,
  setIsOpen,
  testimonial,
}: TestimonialEditorSheetProps) {
  const { toast } = useToast();
  const { addTestimonial, updateTestimonial } = useTestimonialStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: '',
      author: '',
      title: '',
    },
  });

  useEffect(() => {
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
  }, [testimonial, form, isOpen]);

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: TestimonialFormValues) {
    if (testimonial) {
      // Update existing testimonial
      const updatedTestimonial: Testimonial = {
        ...testimonial,
        ...values,
        avatarUrl: imagePreview || testimonial.avatarUrl,
      };
      updateTestimonial(updatedTestimonial);
      toast({
        title: 'Testimonial Updated!',
        description: `The testimonial from "${values.author}" has been successfully updated.`,
      });
    } else {
      // Create new testimonial
      const newTestimonial: Testimonial = {
        id: Date.now(),
        ...values,
        avatarUrl: imagePreview || placeholderImages.testimonial1.imageUrl,
        avatarHint: 'new user',
      };
      addTestimonial(newTestimonial);
      toast({
        title: 'Testimonial Created!',
        description: `The testimonial from "${values.author}" has been successfully created.`,
      });
    }

    form.reset();
    setIsOpen(false);
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
                  <Avatar className="h-32 w-32">
                    {imagePreview && <AvatarImage src={imagePreview} alt="Avatar preview" />}
                    <AvatarFallback>
                      {form.getValues('author')?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    ref={imageInputRef}
                    className="hidden"
                    onChange={handleImageFileChange}
                    accept="image/png, image/jpeg, image/webp"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
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
                <Button type="submit">Save Testimonial</Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
