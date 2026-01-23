import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Cta } from '@/components/cta';
import { ServicesClient } from './services-client';
import { getSetting } from '@/app/actions/settings';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { placeholderImages } from '@/lib/placeholder-images';

export default async function ServicesPage() {
  try {
    const [founderImage, logoUrl] = await Promise.all([
      getSetting('founderImage'),
      getSetting('logo'),
    ]);

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header logoUrl={logoUrl} />
        <main className="flex-1">
          <ServicesClient
            founderImage={
              founderImage ?? placeholderImages.founderImage.imageUrl
            }
          />
          <Cta logoUrl={logoUrl} />
        </main>
        <Footer logoUrl={logoUrl} />
      </div>
    );
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    throw error;
  }
}
