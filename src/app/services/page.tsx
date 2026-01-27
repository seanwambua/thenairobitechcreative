import { Cta } from '@/components/cta';
import { ServicesClient } from './services-client';
import { getSettings } from '@/app/actions/settings';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { DbUninitializedError } from '@/lib/errors';

type Settings = {
  founderImage: string | null;
  founderName: string | null;
  founderMessage: string | null;
  logo: string | null;
};

async function getPageData(): Promise<{
  settings: Settings | null;
  error: Error | null;
}> {
  try {
    const settingsData = await getSettings([
      'founderImage',
      'founderName',
      'founderMessage',
      'logo',
    ]);
    const settings: Settings = {
      founderImage: settingsData.founderImage,
      founderName: settingsData.founderName,
      founderMessage: settingsData.founderMessage,
      logo: settingsData.logo,
    };
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

  const founderImage =
    settings?.founderImage ?? placeholderImages.founderImage.imageUrl;
  const logoUrl = settings?.logo ?? null;

  return (
    <>
      <ServicesClient
        founderImage={founderImage}
        founderName={settings?.founderName ?? null}
        founderMessage={settings?.founderMessage ?? null}
      />
      <Cta logoUrl={logoUrl} />
    </>
  );
}
