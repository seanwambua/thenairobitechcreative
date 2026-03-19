import { Rocket, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function OfferingCategories() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Built for you in every season.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you're starting with a big idea or ready to scale, The
          Nairobi Tech Creative is built for you.
        </p>
        <h3 className="mt-4 text-lg font-semibold text-orange-400">
          We work across two tracks:
        </h3>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex flex-col rounded-2xl bg-card p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Strategy & Ideation</h3>
          </div>
          <p className="mt-4 flex-grow text-muted-foreground">
            From raw idea to launch-ready. Our startup program helps you build a
            solid foundation, turning guesswork into a clear roadmap for your
            business.
          </p>
          <Link href="/coaching" className="mt-6 inline-flex items-center font-semibold text-primary hover:underline">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl bg-card p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="font-headline text-2xl font-bold">
              Technology & Development
            </h3>
          </div>
          <p className="mt-4 text-muted-foreground">
            We build the digital infrastructure your business needs to operate
            and scale. From brand identity and web development to custom
            software and IT systems.
          </p>
        </div>
      </div>
      <div className="mt-12 mx-auto max-w-4xl text-center">
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          What makes us different? We don't hand you a service list and
          ask you to choose. We get to understand where you are on your journey, assess then
          recommend the right starting point. Most of our clients grow through
          both tracks naturally.
        </blockquote>
      </div>
    </section>
  );
}
