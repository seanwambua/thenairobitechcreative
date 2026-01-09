'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Testimonial } from '@/lib/data';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="bg-card/20 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Trusted by Innovators
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from the leaders who have partnered with us to build the future.
          </p>
        </motion.div>
        
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto w-full max-w-5xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-primary/20">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <Quote className="h-10 w-10 text-primary" />
                      <p className="mt-4 flex-1 font-body text-lg italic text-foreground">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-6">
                        <Avatar className="mx-auto h-16 w-16 border-2 border-primary">
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} data-ai-hint={testimonial.avatarHint}/>
                          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="mt-4 font-headline text-lg font-semibold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-4" />
          <CarouselNext className="mr-4"/>
        </Carousel>
      </div>
    </section>
  );
}
