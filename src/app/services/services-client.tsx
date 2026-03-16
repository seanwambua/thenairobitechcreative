'use client';

import { partners } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ServicesSelector } from '@/components/services-selector';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { OfferingCategories } from '@/components/offering-categories';



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
        <OfferingCategories />
        <ServicesSelector />
      </main>
    </div>
  );
}
