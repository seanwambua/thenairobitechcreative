import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import StampLogo from '@/components/stamp-logo';
import ProjectGrid from '@/components/project-grid';
import ConversionTimeline from '@/components/conversion-timeline';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-24 text-center md:flex-row md:py-32 md:text-left">
          <div className="md:w-1/2">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Nairobi Tech Creative
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              African Solutions to Global Problems. We build innovative digital products that empower businesses and communities across the continent and beyond.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Button size="lg">Explore Our Work</Button>
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center md:w-1/2">
            <StampLogo />
          </div>
        </section>

        <section id="projects" className="bg-card py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                2025 Innovation Suite
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A glimpse into our next generation of digital solutions, designed to tackle real-world challenges.
              </p>
            </div>
            <ProjectGrid />
          </div>
        </section>

        <section id="timeline" className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The 90-Day Conversion
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From concept to revenue, we accelerate the journey for startups. Here's how we turned two ideas into profitable businesses in just three months.
              </p>
            </div>
            <ConversionTimeline />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
