'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@prisma/client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <Carousel
      opts={{        
        align: 'start',
        loop: true,
      }}
      className="mx-auto w-full max-w-4xl"
    >
      <CarouselContent>
        {testimonials.map((testimonial: Testimonial, index: number) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Image
                    className="mb-4 h-20 w-20 rounded-full object-cover"
                    src={testimonial.avatarUrl}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                  />
                  <p className="mb-2 text-lg font-semibold">{testimonial.author}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{testimonial.title}</p>
                  <p className="italic">{`\"${testimonial.quote}\"`}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
