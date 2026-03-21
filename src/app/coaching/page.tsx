import { CheckCircle } from 'lucide-react';

export default function StartupCoachingPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/5 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl">
            Startup Coaching
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            From idea to launch-ready. We provide the strategic guidance and
            hands-on support you need to build a successful business from the
            ground up.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <section className="mx-auto max-w-4xl">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            What We Cover
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our startup coaching program is tailored to your unique needs. We
            cover all the critical aspects of building a business, including:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[{
              title: 'Ideation & Validation',
              description: 'Refine your idea and validate your market.',
            },
            {
              title: 'Business & Revenue Modeling',
              description: 'Develop a sustainable business model.',
            },
            {
              title: 'Product & Service Definition',
              description: 'Define your core offerings and value proposition.',
            },
            {
              title: 'Branding & Positioning',
              description: 'Craft a brand that resonates with your audience.',
            },{
              title: 'Go-to-Market Strategy',
              description: 'Plan your launch and customer acquisition.',
            },{
              title: 'Pitch Deck',
              description: 'Get ready to secure the funding you need to grow.',
            },{
              title: 'Financial Management',
              description: 'Get ready to secure the funding you need to grow.',
            }].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
