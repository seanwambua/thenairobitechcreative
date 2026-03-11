'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MissionVision } from '@/components/mission-vision';
import { WhyChooseUs } from '@/components/why-choose-us';

export function AboutClient({
  founderImage,
  founderName,
  founderMessage,
}: {
  founderImage: string | null;
  founderName: string | null;
  founderMessage: string | null;
}) {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/5 text-center py-20 lg:py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl">
            About The Nairobi Tech Creative
          </h1>
        </div>
      </header>

      <main>
        <MissionVision />
        <WhyChooseUs />

        {founderName && founderMessage && (
          <section id="founder" className="bg-primary/5 rounded-lg p-12">
            <div className="flex flex-col items-center text-center">
              {founderImage && (
                <Avatar className="mb-4 h-24 w-24">
                  <AvatarImage
                    src={founderImage}
                    alt={`A portrait of ${founderName}`}
                  />
                  <AvatarFallback>{founderName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <h3 className="font-headline text-3xl font-bold">
                {founderName}
              </h3>
              <p className="text-sm text-muted-foreground">Founder</p>
              <p className="mt-4 max-w-2xl text-lg font-medium italic">
                &ldquo;{founderMessage}&rdquo;
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
