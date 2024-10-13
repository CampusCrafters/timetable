"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TypingLogo from '../Logo/TypingLogo';
import Image from 'next/image';
import BgImage from '../../public/bg.png';

function Hero() {
  const router = useRouter();

  function handleGetStarted() {
    router.push('/dashboard');
  }

  return (
    <div className="relative container bg-stone-950 mx-auto flex flex-col items-center justify-center h-screen px-4 z-20">

      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={BgImage}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="filter blur-sm opacity-90"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/80 to-transparent z-10"></div>

      <motion.h1
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-5xl font-bold text-center text-white mb-4 flex items-center justify-center z-20"
      >
        <span className="hidden md:flex md:mr-2 md:py-3 md:text-white">Welcome to </span>
        <TypingLogo className="text-6xl font-bold inline" />
      </motion.h1>

      <motion.p
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-lg text-center text-gray-300 mb-10 z-20"
      >
        A modern scheduling app for your busy life
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGetStarted}
        className="inline-flex h-12 p-5 items-center justify-center rounded-lg border border-gray z-20"
      >
        Get Started
      </motion.button>
    </div>
  );
}

export default Hero;
