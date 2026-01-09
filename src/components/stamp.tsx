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

      {/* circles */}
      <motion.g clipPath="url(#hand-clip)">
        <motion.circle
          cx="33"
          cy="38"
          r="15"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="67"
          cy="38"
          r="15"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.circle
          cx="50"
          cy="65"
          r="20"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
        />
      </motion.g>

      {/* Hand Outline */}
      <motion.use
        href="#hand-outline"
        strokeWidth="1.5"
        stroke="hsl(var(--primary))"
        fill="hsl(var(--primary))"
        fillOpacity={0.1}
      />

      <motion.use
        href="#hand-outline"
        strokeWidth="2"
        stroke="hsl(var(--primary))"
        fill="none"
        style={{ pathLength }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}
