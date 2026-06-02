import React from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

const WebtoonSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-12 px-6"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <BookOpen className="w-12 h-12 text-shaman-primary-glow mb-4" />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-shaman-text-light mb-6 animate-pulse-glow">
          환사유계 <span className="text-shaman-text-muted text-2xl md:text-3xl ml-4 font-sans font-light tracking-widest border-l border-shaman-primary pl-4">웹툰</span>
        </h2>
      </div>

      <div className="w-full flex flex-col items-center min-h-[500px]">
        {[0, 1, 2, 3, 4].map((index) => (
          <img 
            key={index} 
            src={`https://igx.kr/p/L2/32/${index}`} 
            alt={`웹툰 ${index + 1}화 (부분)`}
            className="w-full max-w-full block bg-shaman-surface/20 min-h-[300px]" 
            loading={index === 0 ? "eager" : "lazy"}
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WebtoonSection;
