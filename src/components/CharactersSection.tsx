import React from 'react';
import { motion } from 'motion/react';
import { User, Skull } from 'lucide-react';

const CharactersSection = () => {
  const characters = [
    { id: 0, name: "레이" },
    { id: 1, name: "레이사" },
    { id: 2, name: "렌" },
    { id: 3, name: "리아" },
    { id: 4, name: "리안" },
    { id: 5, name: "마이" },
    { id: 6, name: "미오" },
    { id: 7, name: "미카" },
    { id: 8, name: "미하루" },
    { id: 9, name: "아오바" },
    { id: 10, name: "세아" },
    { id: 11, name: "세츠" },
    { id: 12, name: "스이카" },
    { id: 13, name: "시이라" },
    { id: 14, name: "오하인" },
    { id: 15, name: "루나" },
    { id: 16, name: "유승아" },
    { id: 17, name: "유이카" },
    { id: 18, name: "시온" },
    { id: 19, name: "카논" },
    { id: 20, name: "코하루" },
    { id: 21, name: "미사" },
    { id: 22, name: "아카네" },
    { id: 23, name: "프리어" },
    { id: 24, name: "프리엘" },
    { id: 25, name: "리츠카" },
    { id: 26, name: "헤이즈" },
    { id: 27, name: "모모카" },
    { id: 28, name: "이로하" },
    { id: 29, name: "소라토" },
  ].map(h => ({
    id: `h-${h.id}`,
    name: h.name,
    grade: "",
    desc: "",
    color: "from-shaman-accent/20 to-transparent",
    category: "human",
    imageUrl: `https://igx.kr/r/L2/${h.id}/0`
  })).concat([
    {
      id: "s-1",
      name: "???",
      grade: "1급 주령",
      desc: "인간의 타락과 정념에서 태어난 주령. 지성을 갖추고 있으며 환사유계 내에서 사람들을 현혹하고 있다.",
      color: "from-shaman-primary/20 to-transparent",
      category: "spirit",
      imageUrl: ""
    }
  ]);

  const CharacterCard = ({ char }: { char: any }) => (
    <div className="relative group perspective-1000">
      <div className={`h-96 rounded-sm bg-gradient-to-b ${char.color} border border-shaman-surface p-6 flex flex-col justify-end overflow-hidden transition-all duration-500 hover:border-shaman-accent group-hover:-translate-y-2`}>
        
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${char.imageUrl ? 'opacity-40 group-hover:opacity-60' : 'opacity-10 group-hover:opacity-20'}`}>
          {char.imageUrl ? (
            <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            char.category === 'spirit' ? <Skull className="w-48 h-48 text-shaman-primary-glow" /> : <User className="w-48 h-48 text-shaman-text-light" />
          )}
        </div>
        
        {(char.desc || char.grade) && (
          <div className="relative z-10 backdrop-blur-sm bg-shaman-bg/40 p-4 rounded border border-shaman-surface/50 transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-serif font-bold text-shaman-text-light">{char.name}</h3>
              {char.grade && <span className="text-xs font-sans tracking-wider border border-shaman-text-muted/30 px-2 py-1 rounded text-shaman-text-muted">{char.grade}</span>}
            </div>
            {char.desc && (
              <p className="text-sm font-sans font-light text-shaman-text-muted leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {char.desc}
              </p>
            )}
          </div>
        )}
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
          주술사 목록
        </h2>
        <p className="mt-6 text-xl text-shaman-text-muted font-sans font-light max-w-2xl mx-auto">
          환사유계에 등장하는 인물 및 존재들입니다.
        </p>
      </div>

      <div className="space-y-16">
        <div className="grid md:grid-cols-3 gap-8">
          {characters.map((char) => (
            <CharacterCard key={char.id} char={char} />
          ))}
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
