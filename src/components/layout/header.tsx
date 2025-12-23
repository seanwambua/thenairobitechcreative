'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stamp } from '@/components/stamp';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8">
            <Stamp />
          </div>
          <span className="hidden font-headline text-xl font-semibold sm:inline-block">
            Nairobi Tech Creative
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="#portfolio"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Portfolio
          </Link>
          <Link
            href="#timeline"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Timeline
          </Link>
        </nav>
        <Button>Contact Us</Button>
      </div>
    </header>
  );
}
