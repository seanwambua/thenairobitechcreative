import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TestimonialsClient } from './testimonials-client';
import { getAllTestimonials } from '@/app/actions/testimonials';

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

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
