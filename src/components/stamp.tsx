'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Stamp() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.svg
      viewBox="0 0 160 160"
      initial="hidden"
      animate="visible"
      className="h-full w-full"
    >
      <defs>
        <motion.path
          id="hand-outline"
          d="M80,5C49.6,5,25,29.6,25,60c0,15,6.2,28.5,16,38.2V145c0,5.5,4.5,10,10,10h58c5.5,0,10-4.5,10-10V98.2c9.8-9.7,16-23.2,16-38.2C135,29.6,110.4,5,80,5z"
        />
        <clipPath id="hand-clip">
          <use href="#hand-outline" />
        </clipPath>
      </defs>

      {/* Hand Outline */}
      <motion.use
        href="#hand-outline"
        strokeWidth="3"
        stroke="hsl(var(--primary))"
        fill="none"
        style={{ pathLength }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      
      {/* Tribal Pattern Fill */}
      <g clipPath="url(#hand-clip)">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          {/* Main circles */}
          <circle cx="80" cy="60" r="30" fill="hsl(var(--secondary))" opacity="0.8"/>
          <circle cx="80" cy="60" r="15" fill="hsl(var(--background))" />
          
          {/* Decorative lines */}
          <motion.path
            d="M50 60 H110 M80 30 V90"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            style={{ pathLength }}
            transition={{ duration: 1.5, ease: 'circOut', delay: 1 }}
          />
          <motion.path
            d="M60 40 L100 80 M60 80 L100 40"
            stroke="hsl(var(--secondary))"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{ pathLength }}
            transition={{ duration: 1.5, ease: 'circOut', delay: 1.2 }}
          />
          {/* Finger lines */}
          <motion.path
            d="M59,105 L59,140 M73,105 L73,140 M87,105 L87,140 M101,105 L101,140"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            opacity="0.6"
            style={{ pathLength }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 1.5 }}
          />
        </motion.g>
      </g>
    </motion.svg>
  );
}
