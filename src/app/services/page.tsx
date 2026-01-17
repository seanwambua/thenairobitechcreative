'use client';
import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Cta } from '@/components/cta';
import { ServicesClient } from './services-client';
import { useMediaStore } from '@/store/media';
import { useBroadcastListener } from '@/hooks/use-broadcast';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { Loader2 } from 'lucide-react';

export default function ServicesPage() {
  const { founderImage, fetchFounderImage, error, isLoading } = useMediaStore();
  
  React.useEffect(() => {
    fetchFounderImage();
  }, [fetchFounderImage]);

  useBroadcastListener((event) => {
    if (event.data.type === 'refetch-media') {
      fetchFounderImage();
    }
  });

  if (error && error.includes('no such table')) {
    return <DbUninitializedError />;
  }

  if (isLoading && !founderImage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ServicesClient founderImage={founderImage} />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
