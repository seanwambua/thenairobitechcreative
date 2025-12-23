'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Stamp() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className="h-full w-full"
    >
      <defs>
        <motion.path
          id="hand-outline"
          d="M86.3,51.2c2.6-3,4.4-6.8,4.4-11.2c0-9.2-7.5-16.7-16.7-16.7c-2.3,0-4.5,0.5-6.5,1.3c-1.9-8.4-9.3-14.8-18.3-14.8c-9,0-16.4,6.3-18.3,14.8c-2-0.8-4.2-1.3-6.5-1.3C15.2,23.3,7.8,30.8,7.8,40c0,4.4,1.8,8.2,4.4,11.2L12,51.4V84c0,2.8,2.2,5,5,5h66c2.8,0,5-2.2,5-5V51.4L86.3,51.2z"
        />
        <clipPath id="hand-clip">
          <use href="#hand-outline" />
        </clipPath>
      </defs>

      {/* Hand Outline */}
      <motion.use
        href="#hand-outline"
        strokeWidth="1.5"
        stroke="hsl(var(--primary))"
        fill="none"
        style={{ pathLength }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Tribal Pattern Fill */}
      <g clipPath="url(#hand-clip)">
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* Base fill */}
          <motion.use href="#hand-outline" fill="hsl(var(--primary))" fillOpacity="0.1" />

          {/* Palm circle */}
          <motion.circle 
            cx="49.5" 
            cy="45" 
            r="15" 
            fill="hsl(var(--secondary))" 
            opacity="0.7"
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{delay: 1.2, duration: 0.5}}
          />
          <motion.circle 
            cx="49.5" 
            cy="45" 
            r="7" 
            fill="hsl(var(--background))" 
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{delay: 1.4, duration: 0.5}}
          />

          {/* Finger lines */}
          <motion.path
            d="M24 78 l5-20 M38 80 l0-25 M52 82 l-2-25 M66 80 l-5-22"
            stroke="hsl(var(--secondary))"
            strokeWidth="1"
            opacity="0.8"
            style={{ pathLength }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 1.5 }}
          />
          
          {/* Dashed lines */}
           <motion.path
            d="M15 60 h70"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="2 3"
            opacity="0.7"
            style={{ pathLength }}
            transition={{ duration: 1.5, ease: 'circOut', delay: 1.8 }}
          />

        </motion.g>
      </g>
    </motion.svg>
  );
}
