import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Hero} from '@/components/hero';
import {BentoPortfolio} from '@/components/bento-portfolio';
import {ConversionTimeline} from '@/components/conversion-timeline';
import {projects, ventureMetrics} from '@/lib/data';
import {Cta} from '@/components/cta';
import {generateBackgroundTexture} from '@/ai/flows/background-texture-generator';
import {generateHeroImage} from '@/ai/flows/hero-image-generator';

export default async function Home() {
  const [{textureDataUri}, {heroImageDataUri}] = await Promise.all([
    generateBackgroundTexture(),
    generateHeroImage(),
  ]);

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

        <section id="timeline" className="bg-card/50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                The 90-Day Conversion Engine
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From concept to revenue, we accelerate the journey. Here’s how we scaled two
                startups in one quarter.
              </p>
            </div>
            <ConversionTimeline ventures={ventureMetrics} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
