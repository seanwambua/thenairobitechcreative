'use client';

import { useEffect, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { useTestimonialStore, type Testimonial } from '@/store/testimonials';
import { MoreHorizontal, PlusCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TestimonialEditorSheet } from '@/components/testimonial-editor-sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const { testimonials, setTestimonials, deleteTestimonial, isLoading, error } = useTestimonialStore();
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTestimonials(initialTestimonials);
  }, [initialTestimonials, setTestimonials]);

  const handleCreateNew = () => {
    setEditingTestimonial(null);
    setEditorOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setEditorOpen(true);
  };

  const handleDeleteInitiate = (testimonial: Testimonial) => {
    setTestimonialToDelete(testimonial);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (testimonialToDelete) {
      try {
        await deleteTestimonial(testimonialToDelete.id);
        toast({
          title: 'Testimonial Deleted',
          description: `The testimonial from "${testimonialToDelete.author}" has been successfully deleted.`,
        });
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete testimonial.',
        });
      } finally {
        setDeleteDialogOpen(false);
        setTestimonialToDelete(null);
      }
    }
  };

  return (
    <>
      <div className="flex justify-end p-6 pt-0">
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Testimonial
          </Button>
        </div>
      <CardContent>
        {isLoading && !testimonials.length ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error && !testimonials.length ? (
          <div className="py-8 text-center text-destructive">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead className="hidden md:table-cell">Title</TableHead>
                <TableHead className="hidden md:table-cell">Quote</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {testimonial.author}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{testimonial.title}</TableCell>
                  <TableCell className="hidden max-w-sm truncate md:table-cell">
                    "{testimonial.quote}"
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(testimonial)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteInitiate(testimonial)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <TestimonialEditorSheet
        isOpen={isEditorOpen}
        setIsOpen={setIsOpen}
        testimonial={editingTestimonial}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial from &quot;
              {testimonialToDelete?.author}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
