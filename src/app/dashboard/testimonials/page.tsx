import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TestimonialsClient } from './testimonials-client';
import { getTestimonials } from '@/lib/actions/testimonials';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { DbUninitializedError } from '@/lib/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const rawTestimonials = await getTestimonials();
    
    // Explicit Serialization: Convert Date objects to strings for Client Component hydration
    const testimonials = JSON.parse(JSON.stringify(rawTestimonials));
    
    return { testimonials, error: null };
  } catch (error: any) {
    if (error.message?.includes('no such table') || error.code === 'P2021') {
      return {
        testimonials: [],
        error: new DbUninitializedError(),
      };
    }
    console.error('[GET_TESTIMONIALS_PAGE_ERROR]:', error);
    return { testimonials: [], error: error as Error };
  }
}

export default async function TestimonialsPage() {
  const { testimonials, error } = await getPageData();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return (
    <div className="space-y-6">
      {error && !testimonials.length && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            We encountered a problem reaching the database. Showing offline or cached results if available.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Testimonials</CardTitle>
            <CardDescription>Manage your customer testimonials.</CardDescription>
          </div>
        </CardHeader>
        <TestimonialsClient initialTestimonials={testimonials} />
      </Card>
    </div>
  );
}
