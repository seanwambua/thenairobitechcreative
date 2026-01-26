import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
      <div className="flex min-h-screen flex-col bg-background">
        <Header logoUrl={logoUrl} />
        <main className="flex-1">
          <PricingClient logoUrl={logoUrl} />
          <Cta logoUrl={logoUrl} />
        </main>
        <Footer />
      </div>
    );
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    // Re-throw other errors to be handled by Next.js error boundary
    throw error;
  }
}
