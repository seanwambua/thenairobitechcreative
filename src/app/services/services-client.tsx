'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ServicesSelector } from '@/components/services-selector';
import { motion } from 'framer-motion';
import Link from 'next/link';

const partners = [
  {
    name: 'Imani financial services (IFS-KE).',
    description: 'A leading provider of innovative tech solutions, we partner with Innovate Inc. to deliver cutting-edge products.',
    logo: '',
    url: 'https://imanifinancialservices.vercel.app/'
  },
  {
    name: 'The Global Grid.',
    description: 'Experts in system integration, Synergy Systems helps us provide seamless and unified solutions for our clients.',
    logo: '',
    url: 'https://theglobalgrid.vercel.app/'
  },
  {
    name: 'Whyte Interior Designs.',
    description: 'Specializing in business growth strategies, Growth Catalysts works with us to help our clients scale effectively.',
    logo: '',
    url: 'https://whyteinteriordesigns.vercel.app/'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function ServicesClient() {

  return (
    <div className="bg-background text-foreground">

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <ServicesSelector />
      </main>

      <section className="bg-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 p-6">
            <h4 className="fint-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              NTC SME HUB
            </h4>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Our network of trusted affiliates and collaborative partners.
            </p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {partners.map((partner) => (
              <Link key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className="block">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card className="h-full bg-background/60 backdrop-blur-sm border-border/20 shadow-lg border-[1px] hover:shadow-[0_20px_25px_-5px_rgba(249,115,22,0.4),_0_8px_10px_-6px_rgba(249,115,22,0.4)] transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={partner.logo} alt={`${partner.name} logo`} />
                        <AvatarFallback className="text-lg">{partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl font-normal">{partner.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base">{partner.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
