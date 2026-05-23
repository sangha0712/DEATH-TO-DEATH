import React from 'react';
import { motion } from 'motion/react';
import { User, Skull } from 'lucide-react';

const CharactersSection = () => {
  const characters = [
    {
      id: 1,
      name: "???",
      grade: "특급 주술사",
      desc: "환사유계에 등장한다는 소문의 주술사. 항상 눈을 가리고 다니며 한계를 알 수 없는 주력을 발산한다.",
      color: "from-shaman-accent/20 to-transparent",
      category: "human"
    },
    {
      id: 2,
      name: "???",
      grade: "1급 주령",
      desc: "인간의 타락과 정념에서 태어난 주령. 지성을 갖추고 있으며 환사유계 내에서 사람들을 현혹하고 있다.",
      color: "from-shaman-primary/20 to-transparent",
      category: "spirit"
    }
  ];

  const humans = characters.filter(c => c.category === 'human');
  const spirits = characters.filter(c => c.category === 'spirit');

  const CharacterCard = ({ char, isSpirit }: { char: any, isSpirit?: boolean }) => (
    <div className="relative group perspective-1000">
      <div className={`h-96 rounded-sm bg-gradient-to-b ${char.color} border border-shaman-surface p-6 flex flex-col justify-end overflow-hidden transition-all duration-500 hover:border-shaman-accent group-hover:-translate-y-2`}>
        
        {/* Silhouette Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
          {isSpirit ? <Skull className="w-48 h-48 text-shaman-primary-glow" /> : <User className="w-48 h-48 text-shaman-text-light" />}
        </div>
        
        <div className="relative z-10 backdrop-blur-sm bg-shaman-bg/40 p-4 rounded border border-shaman-surface/50 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-serif font-bold text-shaman-text-light">{char.name}</h3>
            <span className="text-xs font-sans tracking-wider border border-shaman-text-muted/30 px-2 py-1 rounded text-shaman-text-muted">{char.grade}</span>
          </div>
          <p className="text-sm font-sans font-light text-shaman-text-muted leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
            {char.desc}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto py-12 px-6"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-shaman-text-light mb-4 animate-pulse-glow">
          캐릭터
        </h2>
        <p className="mt-6 text-xl text-shaman-text-muted font-sans font-light max-w-2xl mx-auto">
          환사유계에 등장하는 인물 및 주령들입니다.
        </p>
      </div>

      <div className="space-y-16">
        <div className="space-y-8">
          <h3 className="text-3xl font-serif text-shaman-accent border-b border-shaman-surface pb-4 flex items-center">
            <User className="w-8 h-8 mr-4" />
            인간 (주술사)
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {humans.map((char) => (
              <CharacterCard key={char.id} char={char} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-4 flex items-center">
            <Skull className="w-8 h-8 mr-4" />
            주령
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {spirits.map((char) => (
              <CharacterCard key={char.id} char={char} isSpirit={true} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
         <p className="text-shaman-text-muted/60 text-sm font-light italic">
           * 다양한 개성과 술식을 지닌 더 많은 존재들이 환사유계에서 당신을 기다리고 있습니다.
         </p>
      </div>

    </motion.div>
  );
};

export default CharactersSection;
