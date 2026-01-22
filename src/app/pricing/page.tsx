import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Cta } from '@/components/cta';
import { PricingClient } from './pricing-client';
import { getSetting } from '@/app/actions/settings';
import { DbUninitializedError } from '@/components/db-uninitialized-error';

export default async function PricingPage() {
    try {
        const logoUrl = await getSetting('logo');

        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header logoUrl={logoUrl} />
                <main className="flex-1">
                    <PricingClient logoUrl={logoUrl} />
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
