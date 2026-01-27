import { Cta } from '@/components/cta';
import { PricingClient } from './pricing-client';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { getSetting } from '@/app/actions/settings';
import { DbUninitializedError } from '@/lib/errors';

async function getPageData() {
  try {
    const logoUrl = await getSetting('logo');
    return { logoUrl, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return { logoUrl: null, error: new DbUninitializedError() };
    }
    throw error;
  }
}

export default async function PricingPage() {
  const { logoUrl, error } = await getPageData();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return (
    <>
      <PricingClient logoUrl={logoUrl} />
      <Cta logoUrl={logoUrl} />
    </>
  );
}
