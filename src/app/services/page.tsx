import { Cta } from '@/components/cta';
import { ServicesClient } from './services-client';
import { getSettings } from '@/app/actions/settings';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { placeholderImages } from '@/lib/placeholder-images';
import { DbUninitializedError } from '@/lib/errors';

type Settings = {
  founderImage: string | null;
  founderName: string | null;
  founderMessage: string | null;
  logo: string | null;
};

async function getPageData(): Promise<{ settings: Settings | null; error: Error | null }> {
  try {
    const settings = await getSettings([
      'founderImage',
      'founderName',
      'founderMessage',
      'logo',
    ]);
    return { settings, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return { settings: null, error: new DbUninitializedError() };
    }
    throw error;
  }
}

export default async function ServicesPage() {
  const { settings, error } = await getPageData();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return (
    <>
      <ServicesClient
        founderImage={
          settings?.founderImage ?? placeholderImages.founderImage.imageUrl
        }
        founderName={settings?.founderName ?? null}
        founderMessage={settings?.founderMessage ?? null}
      />
      <Cta logoUrl={settings?.logo ?? null} />
    </>
  );
}
