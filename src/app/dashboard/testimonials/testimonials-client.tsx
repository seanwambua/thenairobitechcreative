'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  Quote, 
  User as UserIcon, 
  Pencil, 
  Trash2,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TestimonialEditorSheet } from '@/components/testimonial-editor-sheet';
import { deleteTestimonial } from '@/lib/actions/testimonials';
import { Role } from '@/lib/roles';
import type { Testimonial } from '@prisma/client';
import { cn } from '@/lib/utils';

interface TestimonialsClientProps {
  initialTestimonials: any[]; // Handle serialized objects
}

export function TestimonialsClient({
  initialTestimonials = [],
}: TestimonialsClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  const filteredTestimonials = useMemo(() => {
    const list = Array.isArray(initialTestimonials) ? initialTestimonials : [];
    return list.filter((t) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        (t.author || '').toLowerCase().includes(searchStr) ||
        (t.title || '').toLowerCase().includes(searchStr) ||
        (t.quote || '').toLowerCase().includes(searchStr)
      );
    });
  }, [initialTestimonials, searchQuery]);

  const handleCreateNew = () => {
    setEditingTestimonial(null);
    setEditorOpen(true);
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setEditorOpen(true);
  };

  const handleDeleteInitiate = (testimonial: any) => {
    setTestimonialToDelete(testimonial);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (testimonialToDelete) {
      try {
        await deleteTestimonial(testimonialToDelete.id);
        router.refresh();
        toast({
          title: 'Testimonial Deleted',
          description: `The testimonial from "${testimonialToDelete.author}" has been removed.`,
        });
      } catch (e: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: e.message || 'Failed to delete testimonial.',
        });
      } finally {
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      }
    }
  };

  const handleSave = () => {
    setEditorOpen(false);
    router.refresh();
  };

  const isOwner = (testimonial: any) => {
    return session?.user?.id === testimonial.userId;
  };

  const isAdmin = session?.user?.role === Role.ADMIN;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="px-6 pb-6">
        {filteredTestimonials.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center bg-muted/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No testimonials found</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {searchQuery ? "Try a different search term." : "Be the first to share a success story."}
            </p>
            {!searchQuery && (
              <Button variant="outline" onClick={handleCreateNew}>
                Create New
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredTestimonials.map((testimonial) => {
              const userOwns = isOwner(testimonial);
              return (
                <Card 
                  key={testimonial.id} 
                  className={cn(
                    "relative flex flex-col transition-all hover:shadow-md",
                    userOwns && "border-primary/50 bg-primary/5 shadow-sm"
                  )}
                >
                  <CardHeader className="p-6 pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
                          <AvatarFallback><UserIcon className="h-6 w-6" /></AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold leading-tight">{testimonial.author}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {testimonial.title}
                          </span>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {(userOwns || isAdmin) && (
                            <>
                              <DropdownMenuItem onClick={() => handleEdit(testimonial)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteInitiate(testimonial)}
                                className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </>
                          )}
                          {!userOwns && !isAdmin && (
                            <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-2 flex-1">
                    <div className="relative">
                      <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/10 -z-0" />
                      <p className="relative z-10 text-sm italic text-muted-foreground line-clamp-4 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex items-center justify-between">
                    <div className="text-[10px] text-muted-foreground">
                      Added {new Date(testimonial.createdAt).toLocaleDateString()}
                    </div>
                    {userOwns && (
                      <Badge variant="secondary" className="text-[10px] font-semibold bg-primary/10 text-primary hover:bg-primary/10">
                        My Testimonial
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <TestimonialEditorSheet
        isOpen={isEditorOpen}
        setIsOpen={setEditorOpen}
        testimonial={editingTestimonial}
        onSave={handleSave}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              testimonial from "{testimonialToDelete?.author}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function setPostToDelete(arg0: null) {
  throw new Error('Function not implemented.');
}
