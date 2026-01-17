'use client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Cta } from '@/components/cta';
import { PricingClient } from './pricing-client';

export default function PricingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <PricingClient />
                <Cta />
            </main>
            <Footer />
        </div>
    );
}
