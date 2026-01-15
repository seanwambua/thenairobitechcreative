import prisma from '@/lib/prisma';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TestimonialsClient } from './testimonials-client';

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage your customer testimonials.</CardDescription>
        </div>
      </CardHeader>
      <TestimonialsClient initialTestimonials={testimonials} />
    </Card>
  );
}
