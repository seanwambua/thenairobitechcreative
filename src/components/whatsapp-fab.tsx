'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function WhatsAppFAB({ phoneNumber }: { phoneNumber: string }) {
  const message = "Hello NTC! I'm interested in your services.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed bottom-8 right-8 z-60"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 active:scale-95">
          <MessageCircle size={32} />
        </div>
      </Link>
    </motion.div>
  );
}
