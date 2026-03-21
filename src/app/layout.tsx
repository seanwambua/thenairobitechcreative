import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import { auth } from '@/lib/auth';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getSetting } from '../lib/actions/settings';
import { WhatsAppFAB } from '@/components/whatsapp-fab';
import { logo } from '@/lib/placeholder-images.json';
import { Analytics } from '@vercel/analytics/next';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-poppins',
});

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'The Nairobi Tech Creative',
    description: 'African Solutions, Global Problems.',
    icons: {
      icon: logo.imageUrl ?? "https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769187527/nairobi_techcreative/ntc-logo_cv0t3n.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const logoUrl = await getSetting('logo');
  const phoneNumber = process.env.WHATSAPP_PHONE_NUMBER ?? ''
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', poppins.variable)}>
        <Providers
          session={session}
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background">
            <Header logoUrl={logoUrl} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppFAB phoneNumber={phoneNumber} />
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
