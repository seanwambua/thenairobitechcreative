'use client';
import {Button} from '@/components/ui/button';
import {Stamp} from '@/components/stamp';
import {motion} from 'framer-motion';
import {ChevronRight} from 'lucide-react';
import Image from 'next/image';

export function Hero({heroImage}: {heroImage: string}) {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: {opacity: 0, x: -20},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  const imageItemVariants = {
    hidden: {opacity: 0, x: 20},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="flex w-full items-center bg-background min-h-[calc(100vh-4rem)]">
      <motion.div
        className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-24 md:grid-cols-2 lg:gap-20 ml-[10%]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-start text-left">
          <motion.div
            className="mb-4 flex h-24 w-24 items-center justify-center md:h-28 md:w-28"
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 0.5}}
          >
            <Stamp />
          </motion.div>
          <motion.h1
            className="font-headline text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl md:text-7xl"
            variants={textItemVariants}
          >
            African solutions for{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              global markets
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[600px] text-lg text-muted-foreground md:text-xl"
            variants={textItemVariants}
          >
            We build innovative digital products that empower businesses and communities across the
            continent and beyond.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
            variants={textItemVariants}
          >
            <Button size="lg">Explore Our Work</Button>
            <Button
              size="lg"
              variant="outline"
            >
              Contact Us <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
        <motion.div 
            className="relative h-80 w-full md:h-full"
            variants={imageItemVariants}
        >
            <Image 
                src={heroImage} 
                alt="Nairobi Tech Hub" 
                fill
                className="rounded-3xl object-cover shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </motion.div>
      </motion.div>
    </section>
  );
}
