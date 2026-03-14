'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { InquirySheet } from './inquiry-sheet';
import placeholderImages from '@/lib/placeholder-images.json';

export function Hero({
  heroImage,
  logoUrl,
}: {
  heroImage: string | null;
  logoUrl: string | null;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="flex h-auto w-full items-center bg-background">
      <motion.div
        className="container mx-auto grid grid-cols-1 items-center justify-evenly gap-12 px-4 py-24 md:grid-cols-2 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="ml-8 flex flex-col items-start text-left">
          <motion.h1
            className="font-headline text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl"
            variants={textItemVariants}
          >
            African solutions,{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              global markets
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[600px] text-lg text-muted-foreground md:text-xl"
            variants={textItemVariants}
          >
            Innovation that empowers businesses and
            communities across the continent and beyond.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
            variants={textItemVariants}
          >
            <Button size="lg" asChild>
            <Link href="#portfolio">Explore Our Work</Link>
            </Button>
            {/* <InquirySheet logoUrl={logoUrl}> */}
              <Button size="lg" variant={"outline"} asChild>
                <Link className="items-center gap-0 hover:decoration-orange-400 hover:decoration-solid" href="https://nairobitechcreative.zohobookings.com/#/nairobitechcreative">Book a session<ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            {/* </InquirySheet> */}
          </motion.div>
        </div>
        <motion.div
          className="relative hidden w-full aspect-square md:block"
          variants={imageItemVariants}
        >
          <Image
            src={heroImage ?? placeholderImages.hero.imageUrl}
            alt="Nairobi Tech Hub"
            fill
            className="rounded-3xl object-cover shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint="futuristic nairobi"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
