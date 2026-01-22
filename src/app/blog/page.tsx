import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getSetting } from '@/app/actions/settings';
import { BlogClient } from './blog-client';
import { DbUninitializedError } from '@/components/db-uninitialized-error';

export default async function BlogPage() {
  try {
    const logoUrl = await getSetting('logo');

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header logoUrl={logoUrl} />
        <BlogClient />
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
