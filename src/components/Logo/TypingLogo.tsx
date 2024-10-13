import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}


const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const TypingLogo: React.FC<LogoProps> = ({ className }) => {
  const text = "TimeTable";
  const letterArray = text.split("");

  return (
    <div className={`flex items-center space-x-2 ${className}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className='font-bold'>
        {letterArray.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={letter === ' ' ? '' : (index < 4 ? 'text-yellow-500' : 'text-white')}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default TypingLogo;
