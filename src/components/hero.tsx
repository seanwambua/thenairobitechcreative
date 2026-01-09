'use client';
import {Button} from '@/components/ui/button';
import {Stamp} from '@/components/stamp';
import {motion} from 'framer-motion';
import {ChevronRight} from 'lucide-react';

export function Hero({heroImage}: {heroImage: string}) {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{backgroundImage: `url(${heroImage})`}}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <motion.div
        className="container relative z-10 mx-auto flex flex-col items-center px-4 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 flex h-24 w-24 items-center justify-center md:h-32 md:w-32"
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5, delay: 0.5}}
        >
          <Stamp />
        </motion.div>
        <motion.h1
          className="font-headline text-5xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          variants={itemVariants}
        >
          African Solutions, <span className="text-primary">Global Problems.</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-[700px] text-lg text-zinc-100 md:text-xl"
          variants={itemVariants}
        >
          We build innovative digital products that empower businesses and communities across the
          continent and beyond.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Button size="lg">Explore Our Work</Button>
          <Button size="lg" variant="outline" className="border-zinc-400 text-zinc-100">
            Contact Us <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
