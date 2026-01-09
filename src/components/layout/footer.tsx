import { Stamp } from '@/components/stamp';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
           <div className="h-8 w-8">
             <Stamp />
           </div>
          <span className="font-headline text-lg font-semibold">The Nairobi Tech Creative</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} The Nairobi Tech Creative. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
