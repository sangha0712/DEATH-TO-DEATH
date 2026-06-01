import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, GraduationCap, Moon, Cross, Users, Skull } from 'lucide-react';
import { rawCharacters } from './CharactersSection';
import { CharacterModal } from './CharacterModal';

const factions = [
  {
    id: 'gov',
    name: "중앙 정부",
    title: "통제와 군림의 중추",
    icon: <Shield className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-shaman-primary-glow border-shaman-primary-glow",
    bgClass: "from-shaman-primary-glow/10",
    sections: [
      { label: "표면적 목적", text: "주술고전과 정부 인력을 통솔하여 온갖 저주와 주령으로부터 무고한 민간인을 절대적으로 보호한다." },
      { label: "본 목적", text: "환사유계의 소원을 손에 넣어 주술이라는 절대적인 힘을 독점, 국가가 세계 위의 '신'으로서 군림하는 것." },
      { label: "분위기", text: "권력의 중심부인 만큼 상명하복이 철저하지만, 소속된 강자들 사이에서는 은밀한 목적을 공유하며 결속되어 있다." }
    ]
  },
  {
    id: 'gods',
    name: "절대신",
    title: "초월적 조율자",
    icon: <Eye className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-shaman-accent border-shaman-accent",
    bgClass: "from-shaman-accent/10",
    sections: [
      { label: "목적", text: "주령과 인간 사이의 균형이 붕괴되어 주령 쪽으로 힘이 급격히 치우치자, 인류에게 주술은 아직 너무나 이른 힘이라고 판단, 환사유계의 시스템을 이용해 모든 인간으로부터 주력과 주술을 강제로 회수하고자 한다." },
      { label: "모순", text: "주술을 부정하고 필멸자들로부터 회수하려는 그들 자신이 가장 강력하고 초월적인 주술사들이다." },
      { label: "분위기", text: "절대적인 위치와는 다르게 권위 의식이 적으며, 프리엘을 구심점 삼아 의외로 인간적이고 두루두루 친밀한 유대를 나눈다." }
    ]
  },
  {
    id: 'jujutsu',
    name: "주술 고교",
    title: "최전선의 방패이자 소모품",
    icon: <GraduationCap className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-shaman-text-light border-shaman-text-light",
    bgClass: "from-shaman-text-light/10",
    sections: [
      { label: "목적", text: "정부 산하의 최정예 무력·교육 기관으로서 민간인의 절대적인 보호와 주령의 제령을 최우선 사명으로 삼는다." },
      { label: "어두운 이면", text: "상부(정부)의 피도 눈물도 없는 지시에 따라 아직 어린 학생들마저 극도로 위험한 사지에 무자비하게 투입되며, 사실상 시스템을 유지하기 위한 소모품처럼 다루어지고 있다." },
      { label: "분위기", text: "누군가 죽어나갈지도 모르는 가혹한 현실 속에서도, 학생과 교직원들 사이는 휴식 시간에 서로 장난을 치고 농담을 주고받을 정도로 친밀하다." }
    ]
  },
  {
    id: 'eclipse',
    name: "이클립스",
    title: "칠흑의 집행자",
    icon: <Moon className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-[#a3a3a3] border-[#a3a3a3]",
    bgClass: "from-white/10",
    sections: [
      { label: "목적", text: "사회를 어지럽히는 흉악한 술식 범죄자, 고전 탈주자, 그리고 통제 불능의 위험 주령 사용자를 그림자 속에서 찾아내어 처단한다." },
      { label: "모순", text: "자신들의 엄격한 기준을 벗어난 존재는 무조건적인 죄인으로 규정한다. 대의와 정의를 표방하면서도 목적을 위해서라면 아무 죄 없는 일반 비술사의 희생마저 정당화하는 독선적 면모를 품고 있다." },
      { label: "분위기", text: "임무 수행 시에는 한없이 공적이고 냉혹한 처형인이지만, 사석에서는 서로 시시콜콜한 농담을 나눌 정도로 깊은 유대감을 형성하고 있다." }
    ]
  },
  {
    id: 'sanctuary',
    name: "백계성역",
    title: "성스러운 멸망의 전도사",
    icon: <Cross className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-[#fef08a] border-[#fef08a]",
    bgClass: "from-yellow-200/10",
    sections: [
      { label: "목적", text: "세계의 질서를 위협하는 위험한 술식, 균형을 깨뜨리는 불안정한 세계관, 통제할 수 없는 이질적 존재들을 신성한 이름 아래 정화한다." },
      { label: "모순", text: "절대적이고 맹목적인 신앙이 비틀린 나머지, 완전무결해져야 할 세계에 거스르는 불완전한 '인간 자체'를 가장 큰 오류이자 부정함으로 엮어 절멸과 정화의 대상으로 삼고 있다." },
      { label: "분위기", text: "겉보기에는 세상의 모든 죄업을 안아줄 듯 포용적이고 자애로운 초월적 분위기를 자아내며, 구성원들 간에도 언제나 평화롭게 웃으며 농담을 나눈다." }
    ]
  },
  {
    id: 'grave',
    name: "그레이브",
    title: "버림받은 자들의 안식처",
    icon: <Skull className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-[#c084fc] border-[#c084fc]",
    bgClass: "from-purple-500/10",
    sections: [
      { label: "목적", text: "주술 사회나 비술사 사회 어느 곳에서도 융화되지 못하고 멸시와 핍박을 받은 채 버려진 주술사들을 구원하고 거두어들인다." },
      { label: "특징", text: "자신들을 탄압하고 씻을 수 없는 상처를 입힌 비술사 집단 전반을 잠재적인 가해자로 단정짓고 극도로 혐오하며, 주술사들만이 평화롭게 살아갈 수 있는 일그러진 낙원을 꿈꾼다." },
      { label: "분위기", text: "세상으로부터 철저히 버려지고 상처받은 영혼들이 모여 있기에, 서로의 아픔을 깊이 이해하고 보듬는 '진짜 가족'과 다름없는 결속력을 자랑한다." }
    ]
  },
  {
    id: 'hwansa',
    name: "환사유계 내부 / NPC",
    title: "탐욕의 배틀로얄",
    icon: <Users className="w-8 h-8 md:w-12 md:h-12" />,
    colorClass: "text-[#fb923c] border-[#fb923c]",
    bgClass: "from-orange-500/10",
    sections: [
      { label: "목적", text: "오직 자신만의 맹목적인 야망과 도달하고 싶은 절대적인 소원을 이루기 위해 수단과 방법을 가리지 않는다. 전능한 소원을 이뤄준다는 환사유계의 전승을 굳게 믿으며 경쟁자를 기꺼이 제물로 바친다." },
      { label: "분위기", text: "결계 안은 어떠한 유대도 없는 철저한 약육강식. 상대방을 전혀 알지도 못하며, 오로지 베어 넘기고 살아남아야 할 적으로만 간주한다." }
    ]
  }
];

const FactionsSection = () => {
  const [selectedChar, setSelectedChar] = useState<any>(null);

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
          세력
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-shaman-primary to-transparent mx-auto"></div>
        <p className="mt-6 text-xl text-shaman-text-muted font-sans font-light tracking-widest uppercase">Factions & Organizations</p>
      </div>

      <div className="space-y-12">
        {factions.map((faction, idx) => (
          <motion.div 
            key={faction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative overflow-hidden rounded-lg border border-shaman-surface bg-shaman-surface/20 group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${faction.bgClass} to-transparent opacity-30 pointer-events-none`} />
            
            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="md:w-1/3 shrink-0 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-shaman-surface pb-6 md:pb-0 md:pr-10">
                <div className={`p-4 rounded-full border mb-4 shadow-lg ${faction.colorClass} bg-black/40`}>
                  {faction.icon}
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">{faction.name}</h3>
                <p className={`text-sm tracking-widest font-bold ${faction.colorClass.split(' ')[0]}`}>{faction.title}</p>
              </div>

              <div className="md:w-2/3 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  {faction.sections.map((sec, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-bold text-shaman-text-muted tracking-wider mb-2">{sec.label}</h4>
                      <p className="text-shaman-text-light font-light leading-relaxed text-[15px] md:text-base break-keep">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </div>

                {(() => {
                  const members = rawCharacters.filter(c => c.faction === faction.id || c.faction2 === faction.id);
                  if (members.length === 0) return null;
                  return (
                    <div className="mt-8 pt-6 border-t border-shaman-surface/50">
                      <h4 className="text-sm font-bold text-shaman-text-muted tracking-wider mb-4">소속 주술사</h4>
                      <div className="flex flex-wrap gap-4 md:gap-5">
                        {members.map(char => (
                          <div 
                            key={char.id} 
                            className="flex flex-col items-center gap-2 cursor-pointer group/char"
                            onClick={() => setSelectedChar(char)}
                          >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-shaman-surface group-hover/char:border-shaman-primary-glow transition-all duration-300 relative bg-black/50">
                              <img src={`https://igx.kr/r/L2/${char.id}/0`} alt={char.name} className="w-full h-full object-cover group-hover/char:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                            </div>
                            <span className="text-[11px] text-shaman-text-muted group-hover/char:text-shaman-text-light font-light tracking-wide transition-colors">{char.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedChar && (
          <CharacterModal 
            selectedChar={selectedChar} 
            onClose={() => setSelectedChar(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FactionsSection;
