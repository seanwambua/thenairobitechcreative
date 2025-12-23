'use client';
import { Button } from '@/components/ui/button';
import { Stamp } from '@/components/stamp';
import { motion } from 'framer-motion';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 px-4 py-24 text-center md:flex-row md:text-left">
      <motion.div
        className="md:w-1/2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-headline text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
          variants={itemVariants}
        >
          African Solutions
          <br />
          <span className="text-primary">Global Problems.</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl"
          variants={itemVariants}
        >
          We build innovative digital products that empower businesses and
          communities across the continent and beyond.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
          variants={itemVariants}
        >
          <Button size="lg">Explore Our Work</Button>
          <Button size="lg" variant="secondary">
            Contact Us
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="flex h-64 w-64 items-center justify-center md:h-96 md:w-96 md:w-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Stamp />
      </motion.div>
    </section>
  );
}
