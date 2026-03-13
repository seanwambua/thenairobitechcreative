import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TestimonialsClient } from './testimonials-client';
import { getAllTestimonials } from '@/lib/actions/testimonials';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { DbUninitializedError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const testimonials = await getAllTestimonials();
    return { testimonials, error: null };
  } catch (error: any) {
    // Specifically catch missing table errors (common in SQLite/Prisma setups)
    if (error.message?.includes('no such table') || error.code === 'P2021') {
      return {
        testimonials: [],
        error: new DbUninitializedError(),
      };
    }
    console.error('[GET_TESTIMONIALS_ERROR]:', error);
    return { testimonials: [], error: error as Error };
  }
}

export default async function TestimonialsPage() {
  const { testimonials, error } = await getPageData();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage your customer testimonials.</CardDescription>
        </div>
      </CardHeader>
      <TestimonialsClient initialTestimonials={testimonials ?? []} />
    </Card>
  );
}
