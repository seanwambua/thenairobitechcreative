'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { createFeedback } from '@/lib/actions/feedback';
import { StarRating } from '@/components/ui/star-rating';

export function FeedbackFab() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [subject, setSubject] = useState('');
  const [heardFrom, setHeardFrom] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const panelVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { y: 100, opacity: 0, scale: 0.9, transition: { type: 'tween', duration: 0.2 } },
  };

  const handleCreateFeedback = async () => {
    if (!content.trim() || !subject || rating === 0) {
      toast.error('Please fill out all fields and provide a rating.');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('rating', String(rating));
    formData.append('subject', subject);
    formData.append('page', pathname);
    formData.append('heardFrom', JSON.stringify(heardFrom));

    startTransition(async () => {
      const result = await createFeedback(formData);
      if (result.success) {
        toast.success(result.message);
        setContent('');
        setRating(0);
        setSubject('');
        setHeardFrom([]);
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleHeardFromChange = (option: string) => {
    setHeardFrom(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option) 
        : [...prev, option]
    );
  };

  return (
    <>
      <div className="fixed bottom-32 right-8 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
              <Button size="icon" className="h-16 w-16 rounded-full shadow-2xl" onClick={() => setIsOpen(true)}>
                <MessageSquare className="h-7 w-7" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-32 right-8 z-40 w-[calc(100vw-4rem)] max-w-md overflow-hidden rounded-xl bg-muted/90 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b bg-muted/50 p-4">
              <h2 className="font-headline text-2xl font-bold">Feedback</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close feedback panel</span>
              </Button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-4">
              {session?.user ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <StarRating rating={rating} setRating={setRating} />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={setSubject} value={subject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Feedback</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="content">Feedback</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your feedback..."
                      disabled={isPending}
                    />
                  </div>
                  <div>
                    <Label>How did you hear about us?</Label>
                    <div className="mt-2 space-y-2">
                      {['Search Engine', 'Social Media', 'Friend', 'Advertisement', 'Other'].map(option => (
                        <div key={option} className="flex items-center gap-2">
                          <Checkbox 
                            id={`heard-from-${option}`}
                            onCheckedChange={() => handleHeardFromChange(option)}
                          />
                          <Label htmlFor={`heard-from-${option}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleCreateFeedback} disabled={isPending || !content.trim() || !subject || rating === 0}>
                      {isPending ? 'Posting...' : 'Post Feedback'}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Please sign in to leave feedback.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
