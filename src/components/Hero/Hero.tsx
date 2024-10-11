"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TypingLogo from '../Logo/TypingLogo';


function Hero() {
  const router = useRouter();

  function handleGetStarted() {
    router.push('/dashboard');
  }

  return (
      <div className="relative z-10 container mx-auto bg-stone-950 flex flex-col items-center justify-center h-screen px-4">
        <motion.h1
    
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-5xl font-bold text-center text-slate-950 mb-4 flex items-center justify-center"
        >
          <span className="hidden md:flex md:mr-2 md:py-3 md:text-white">Welcome to </span>
          <TypingLogo className="text-6xl font-bold inline " />
        </motion.h1>
        <motion.p

          initial="initial"
          animate="animate"
          exit="exit"
          className="text-lg text-center text-gray-300 mb-10"
        >
          A modern scheduling app for your busy life
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGetStarted}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg border border-white bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Get Started
        </motion.button>
      </div>
  );
}

export default Hero;
