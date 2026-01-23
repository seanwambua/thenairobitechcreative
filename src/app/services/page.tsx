import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Cta } from '@/components/cta';
import { ServicesClient } from './services-client';
import { getSettings } from '@/app/actions/settings';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { placeholderImages } from '@/lib/placeholder-images';

export default async function ServicesPage() {
  try {
    const settings = await getSettings([
      'founderImage',
      'founderName',
      'founderMessage',
      'logo',
    ]);

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <ServicesClient
            founderImage={
              settings.founderImage ?? placeholderImages.founderImage.imageUrl
            }
            founderName={settings.founderName}
            founderMessage={settings.founderMessage}
          />
          <Cta logoUrl={settings.logo} />
        </main>
        <Footer />
      </div>
    );
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    throw error;
  }
}
