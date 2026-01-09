import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Hero} from '@/components/hero';
import {BentoPortfolio} from '@/components/bento-portfolio';
import {projects} from '@/lib/data';
import {Cta} from '@/components/cta';
import { placeholderImages } from '@/lib/placeholder-images';

export default async function Home() {
  const heroImageDataUri = placeholderImages.hero.imageUrl;
  const textureDataUri = placeholderImages.background.imageUrl;

  return (
    <div
      className="flex min-h-screen flex-col bg-background"
      style={{
        backgroundImage: `url(${textureDataUri})`,
        backgroundSize: '300px 300px',
        backgroundAttachment: 'fixed',
      }}
    >
      <Header />
      <main className="flex-1">
        <Hero heroImage={heroImageDataUri} />

        <section id="portfolio" className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                2025 Innovation Suite
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Showcasing our next generation of African-built digital solutions designed to
                tackle global challenges.
              </p>
            </div>
            <BentoPortfolio projects={projects} />
          </div>
        </section>

        <Cta />

      </main>
      <Footer />
    </div>
  );
}
