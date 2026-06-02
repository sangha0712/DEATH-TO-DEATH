import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Loader2 } from 'lucide-react';

const WebtoonSection = () => {
  // 첫 번째 이미지를 즉시 로드하고, 나머지는 백그라운드에서 확인합니다.
  const [images, setImages] = useState<number[]>([0]);

  useEffect(() => {
    let isMounted = true;
    const checkImages = async () => {
      let index = 1;
      let hasMore = true;

      while (hasMore && index < 20) {
        const img = new Image();
        img.referrerPolicy = "no-referrer";
        
        try {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = `https://igx.kr/p/L2/32/${index}`;
          });
          if (!isMounted) return;
          
          setImages(prev => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
          index++;
        } catch {
          hasMore = false;
        }
      }
    };

    checkImages();
    return () => { isMounted = false; };
  }, []);

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
        {images.map((index) => (
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
