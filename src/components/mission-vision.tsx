'use client';

import { Globe, Lightbulb } from 'lucide-react';

export function MissionVision() {
  return (
    <section id="mission-vision" className="bg-primary/5 py-20">
      <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2">
        <div className="flex flex-col items-center text-center">
          <Lightbulb className="h-12 w-12 text-primary" />
          <h2 className="mt-6 mb-4 font-headline text-3xl font-extrabold">
            Our Mission
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            To empower businesses with transformative digital solutions that are
            not only effective but also perfectly aligned with their unique
            vision for success. We are committed to transparency, collaboration,
            and continuous optimization.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Globe className="h-12 w-12 text-primary" />
          <h2 className="mt-6 mb-4 font-headline text-3xl font-extrabold">
            Our Vision
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            To be the leading partner for businesses seeking to innovate and
            thrive in the digital-first world. We envision a future where
            technology is a seamless extension of every business, driving
            growth and creating a positive global impact.
          </p>
        </div>
      </div>
    </section>
  );
}
