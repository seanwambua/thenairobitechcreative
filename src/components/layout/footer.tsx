import StampLogo from '@/components/stamp-logo';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
           <div className="h-8 w-8">
             <StampLogo />
           </div>
          <span className="font-headline text-lg font-semibold">Nairobi Tech Creative</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nairobi Tech Creative. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
