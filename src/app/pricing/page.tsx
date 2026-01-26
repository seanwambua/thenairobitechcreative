import { Cta } from '@/components/cta';
import { PricingClient } from './pricing-client';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { getSetting } from '@/app/actions/settings';

export default async function PricingPage() {
  // The DbUninitializedError is a safeguard.
  // In a real app, you might want a more robust health check.
  try {
    const logoUrl = await getSetting('logo');
    return (
      <>
        <PricingClient logoUrl={logoUrl} />
        <Cta logoUrl={logoUrl} />
      </>
    );
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    // Re-throw other errors to be handled by Next.js error boundary
    throw error;
  }
}
