'use client';
import * as React from 'react';
import { Stamp } from '@/components/stamp';
import { useMediaStore } from '@/store/media';
import { useBroadcastListener } from '@/hooks/use-broadcast';


export function Footer() {
  const { logoUrl, fetchLogoUrl } = useMediaStore();

  React.useEffect(() => {
    fetchLogoUrl();
  }, [fetchLogoUrl]);

  useBroadcastListener((event) => {
    if (event.data.type === 'refetch-media') {
      fetchLogoUrl();
    }
  });

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
           <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
             <Stamp logoUrl={logoUrl} />
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
