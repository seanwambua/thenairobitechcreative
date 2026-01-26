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
      <>
        <ServicesClient
          founderImage={
            settings.founderImage ?? placeholderImages.founderImage.imageUrl
          }
          founderName={settings.founderName}
          founderMessage={settings.founderMessage}
        />
        <Cta logoUrl={settings.logo} />
      </>
    );
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    throw error;
  }
}
