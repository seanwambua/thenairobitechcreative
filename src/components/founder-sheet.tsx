'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { placeholderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

export function FounderSheet({ children }: { children: React.ReactNode }) {
  const founderImage = placeholderImages.founder;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full max-w-2xl overflow-y-auto" side="right">
        <SheetHeader className="text-left">
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage
                src={founderImage.imageUrl}
                alt="Founder"
                data-ai-hint={founderImage.imageHint}
              />
            </Avatar>
            <SheetTitle className="font-headline text-3xl font-extrabold">
              A Message from the Founder
            </SheetTitle>
          </div>
        </SheetHeader>
        <Separator />
        <div className="prose prose-lg mx-auto max-w-none py-8 dark:prose-invert">
          <p className="lead text-muted-foreground">
            "At The Nairobi Tech Creative, we believe in the power of African innovation to solve
            global problems. We are not just building software; we are crafting digital solutions
            that empower communities, drive growth, and create lasting impact."
          </p>

          <h3 className="font-headline">Our Mission</h3>
          <p>
            To empower African businesses and entrepreneurs with world-class digital products,
            enabling them to compete and thrive on the global stage. We are committed to fostering
            local talent and building a sustainable tech ecosystem.
          </p>

          <h3 className="font-headline">Our Vision</h3>
          <p>
            To be the leading catalyst for digital transformation in Africa, recognized for our
            innovation, quality, and unwavering commitment to our clients' success. We envision a
            future where African-built technology is the standard for excellence worldwide.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}