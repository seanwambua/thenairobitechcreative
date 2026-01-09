'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Testimonial } from '@/lib/data';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="testimonials" className="bg-background py-20 lg:py-32">
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
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/1">
                <motion.div variants={itemVariants} className="p-2">
                  <Card className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-primary/20">
                    <CardContent className="flex flex-1 flex-col p-8">
                      <Quote className="h-8 w-8 text-primary" />
                      <blockquote className="mt-4 flex-1 font-body text-base italic text-foreground">
                        "{testimonial.quote}"
                      </blockquote>
                      <footer className="mt-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14 border-2 border-primary">
                            <AvatarImage
                              src={testimonial.avatarUrl}
                              alt={testimonial.author}
                              data-ai-hint={testimonial.avatarHint}
                            />
                            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-headline text-base font-semibold text-foreground">
                              {testimonial.author}
                            </p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </footer>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
