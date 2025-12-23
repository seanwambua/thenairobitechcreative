'use client';

import { motion } from 'framer-motion';

const StampLogo = () => {
  const svgVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };
  
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'backOut'
        }
    }
  }

  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      className="h-full w-full"
    >
      <motion.path
        d="M12.5 50C12.5 29.2893 29.2893 12.5 50 12.5C70.7107 12.5 87.5 29.2893 87.5 50C87.5 70.7107 70.7107 87.5 50 87.5C29.2893 87.5 12.5 70.7107 12.5 50Z"
        fill="hsl(var(--primary))"
        variants={pathVariants}
      />
      <motion.path
        d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z"
        fill="hsl(var(--secondary))"
        variants={pathVariants}
      />
      <motion.path
        d="M27.5 50C27.5 37.6193 37.6193 27.5 50 27.5C62.3807 27.5 72.5 37.6193 72.5 50C72.5 62.3807 62.3807 72.5 50 72.5C37.6193 72.5 27.5 62.3807 27.5 50Z"
        fill="hsl(var(--background))"
        variants={pathVariants}
      />
      <motion.g variants={circleVariants}>
        <path d="M50 35 L50 45 M50 55 L50 65 M40 40 L45 45 M55 55 L60 60 M60 40 L55 45 M45 55 L40 60 M35 50 L45 50 M55 50 L65 50" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
        <motion.circle 
            cx="50" 
            cy="50" 
            r="12" 
            stroke="hsl(var(--foreground))" 
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
        />
      </motion.g>
    </motion.svg>
  );
};

export default StampLogo;
