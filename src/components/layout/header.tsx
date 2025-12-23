import Link from 'next/link';
import StampLogo from '@/components/stamp-logo';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8">
            <StampLogo />
          </div>
          <span className="hidden font-headline text-lg font-bold sm:inline-block">
            Nairobi Tech Creative
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link
            href="#projects"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          <Link
            href="#timeline"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Timeline
          </Link>
        </nav>
        <Button variant="secondary">Get in Touch</Button>
      </div>
    </header>
  );
}
