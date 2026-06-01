import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const factionsMap: Record<string, string> = {
  jujutsu: '주술 고교',
  eclipse: '이클립스',
  sanctuary: '백계성역',
  gods: '절대신',
  hwansa: '환사유계 내부',
  gov: '중앙 정부',
  grave: '그레이브'
};

const emotionMap = [
  { id: 0, name: "평상시" },
  { id: 1, name: "미소/신남" },
  { id: 2, name: "장난" },
  { id: 3, name: "부끄러움" },
  { id: 4, name: "삐짐" },
  { id: 5, name: "진지/화남" },
  { id: 6, name: "놀람" },
  { id: 7, name: "체념/우울" },
  { id: 8, name: "울음" },
  { id: 9, name: "피곤" },
  { id: 10, name: "불안/초조" },
  { id: 11, name: "의문/궁금" },
  { id: 12, name: "경멸" },
  { id: 13, name: "전투 태세" },
  { id: 14, name: "술식 사용" },
  { id: 15, name: "영역전개" }
];

export const CharacterModal = ({ selectedChar, onClose }: { selectedChar: any, onClose: () => void }) => {
  const [currentImgId, setCurrentImgId] = useState(0);

  useEffect(() => {
    setCurrentImgId(0);
  }, [selectedChar]);

  if (!selectedChar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ margin: 0 }}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-shaman-bg border border-shaman-surface rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Pane */}
        <div className="w-full md:w-[45%] h-80 md:h-auto bg-black relative shrink-0 flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImgId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={`https://igx.kr/r/L2/${selectedChar.id}/${currentImgId}`} 
                alt={selectedChar.name} 
                className="w-full h-full object-cover object-top md:object-center absolute inset-0" 
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-shaman-bg/90 hidden md:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-shaman-bg via-transparent to-transparent block md:hidden pointer-events-none" />
          </div>

          {/* Emotion Selector */}
          <div className="w-full bg-black/60 p-2.5 flex overflow-x-auto gap-2 z-30 relative shrink-0 h-[88px] border-t border-shaman-surface/50">
            {emotionMap.map(emo => (
              <button 
                key={emo.id}
                onClick={() => setCurrentImgId(emo.id)}
                title={emo.name}
                className={`flex-none w-14 h-full rounded border overflow-hidden relative group transition-all duration-200 ${currentImgId === emo.id ? 'border-shaman-primary-glow shadow-[0_0_8px_rgba(255,59,59,0.5)] scale-[1.02]' : 'border-transparent opacity-50 hover:opacity-100 hover:border-shaman-surface'}`}
              >
                <img src={`https://igx.kr/r/L2/${selectedChar.id}/${emo.id}`} alt={emo.name} className="w-full h-full object-cover pointer-events-none" referrerPolicy="no-referrer" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-black/20 pt-2 pb-0.5 px-0.5">
                  <span className="text-[9px] text-white/90 leading-tight block text-center break-keep font-sans break-words">{emo.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Pane */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-shaman-bg to-shaman-surface/20">
          <div className="mb-6 pb-6 border-b border-shaman-surface/50">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-shaman-text-light">{selectedChar.name}</h3>
              {selectedChar.grade && (
                <span className="text-sm font-sans font-bold bg-shaman-primary-glow/10 border border-shaman-primary-glow/40 text-shaman-primary-glow px-2.5 py-1 rounded">
                  {selectedChar.grade}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-shaman-text-muted mt-2 font-sans font-light">
                {selectedChar.age && (
                  <span>{selectedChar.gender} / {selectedChar.age}세 • </span>
                )}
                <span>{factionsMap[selectedChar.faction] || factionsMap[selectedChar.faction2] || selectedChar.faction}</span>
            </div>
          </div>

          <div className="space-y-6">
            {selectedChar.technique && (
              <div className="bg-black/30 p-4 border-l-2 border-shaman-primary-glow rounded-r">
                <h4 className="text-xs text-shaman-primary-glow font-bold mb-2 tracking-wider">술식</h4>
                <p className="text-shaman-text-light font-light leading-relaxed text-[15px]">
                  {selectedChar.technique}
                </p>
              </div>
            )}

            {selectedChar.domain && (
              <div className="bg-black/30 p-4 border-l-2 border-shaman-accent rounded-r">
                <h4 className="text-xs text-shaman-accent font-bold mb-2 tracking-wider">영역전개</h4>
                <p className="text-shaman-text-light font-light leading-relaxed text-[15px]">
                  {selectedChar.domain}
                </p>
              </div>
            )}

            {selectedChar.tags && selectedChar.tags.length > 0 && (
              <div className="pt-4">
                <h4 className="text-xs text-shaman-text-muted font-bold mb-3 tracking-wider">특이사항</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedChar.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-xs bg-white/5 border border-white/10 text-shaman-text-muted px-2.5 py-1 rounded-sm tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!selectedChar.technique && (!selectedChar.tags || selectedChar.tags.length === 0) && (
              <div className="py-8 text-center border border-dashed border-shaman-surface rounded-lg bg-black/20">
                <p className="text-shaman-text-muted font-light italic">
                  능력 및 배경 정보 불명 (데이터 수집 중)
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
