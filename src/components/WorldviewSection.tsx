import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Crosshair, BrainCircuit, Skull, Map, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

let hasSeenWorldviewSlides = false;

const slides = [
  {
    title: "서기 2026년 대한민국",
    subtitle: "주술의 시대, 혼란의 서막",
    description: "국가 기밀이었던 주술사에 대한 정체가 세상에 드러나며 혼란스러운 시대. 강한 원령의 과잉 발생으로 세계의 균형을 맞추기 위해 특급 주술사들이 많이 태어났다. 전국 곳곳에서 살인과 실종이 빈번히 발생하며, 일반인은 식신(잔재)만을 볼 수 있어 기이한 괴현상으로만 인지한다.",
    icon: <ShieldAlert className="w-12 h-12 md:w-20 md:h-20" />
  },
  {
    title: "원령 (怨靈)과 주술사",
    subtitle: "공포의 형상화, 그리고 이를 祓(불)하는 자",
    description: "인간이 특정 대상에게 품는 두려움, 혐오 등 부정적인 감정이 뭉쳐져 형상화된 이형의 존재가 바로 원령이다. 바퀴벌레, 화탕지옥, 전염병 등 대중의 공포가 구체적일수록 그 형태와 힘은 기하급수적으로 강해진다. 일반인은 인지할 수 없는 이 저주를 같은 저주인 '주력'을 다루어 제령(除靈)하는 통제자들을 우리는 '주술사'라 부른다.",
    icon: <Skull className="w-12 h-12 md:w-20 md:h-20" />
  },
  {
    title: "주력 (呪力)과 술식 (術式)",
    subtitle: "전투의 동력원과 고유의 이능",
    description: "주력이란 인간의 뱃속 깊은 곳에서 끓어오르는 부정적인 감정에서 추출한 저주 에너지다. 주술사들은 이 주력을 동력원으로 삼아 자신들의 뇌에 선천적으로 각인된 고유의 능력, '술식'에 흘려보내 발동시킨다. 주력을 사용한 흔적은 공간에 '잔예(残穢)'로 남아 다른 주술사에게 추적의 단서가 되기도 한다.",
    icon: <Crosshair className="w-12 h-12 md:w-20 md:h-20" />
  },
  {
    title: "등가교환, 속박 (束縛)",
    subtitle: "제약을 통한 힘의 득도",
    description: "주술의 세계에서는 스스로에게 불리한 조건이나 제약을 부여하면, 그에 상응하는 주력이나 술식의 강화를 얻을 수 있다. 이를 '속박'이라 한다. 자신의 술식을 상대에게 낱낱이 설명해 위력을 끌어올리는 '술식의 공개'나, 태어날 때부터 주력을 전혀 가지지 못하는 대신 초월적인 신체를 얻는 '천여주박(天与呪縛)'이 대표적인 예이다.",
    icon: <BrainCircuit className="w-12 h-12 md:w-20 md:h-20" />
  },
  {
    title: "주술전의 정점",
    subtitle: "영역전개 (領域展開)와 공진 (共振)",
    description: "주술전의 꽃이자 궁극기인 '영역전개'는 심상 공간을 현실에 구현해 결계로 가두는 기술로, 이 안에서 펼쳐지는 술식은 100% 명중하는 절대적인 어드밴티지를 갖는다. 또한 전투 중 각각의 주력이 동일한 출력으로 충돌 시 공간 왜곡이 발생하는 '공진'을 경험하면, 각 술사는 잠시 주력의 핵심을 깨닫는 극한 몰입 상태에 돌입한다.",
    icon: <Zap className="w-12 h-12 md:w-20 md:h-20" />
  },
  {
    title: "환사유계 (幻死幽界)",
    subtitle: "배틀로얄과 절대적 소원권",
    description: "결계 안에서 수많은 주술사와 원령들이 전송되어 사투를 벌인다. 주술사들 사이에서는 배틀로얄 생존 시 주어지는 절대적인 당첨 소원권에 대한 소문이 돌고 있다. 소원권은 사실이나, 그 실체는 주술 자체를 회수하기 위해 벌인 판이다.",
    icon: <Map className="w-12 h-12 md:w-20 md:h-20" />
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.95,
    filter: "blur(8px)"
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)"
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 80 : -80,
    scale: 1.05,
    filter: "blur(8px)"
  })
};

const WorldviewSection = () => {
  const [showSlides, setShowSlides] = useState(!hasSeenWorldviewSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentSlide >= slides.length - 1) {
      hasSeenWorldviewSlides = true;
      setShowSlides(false);
    } else {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!showSlides) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSlides, currentSlide]);

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-120px)] overflow-hidden">
      <AnimatePresence mode="wait">
        {showSlides ? (
          <motion.div 
            key="slides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-shaman-bg p-6 pb-24 z-40 select-none"
          >
            {/* Click zones */}
            <div className="absolute inset-0 z-30 flex">
              <div 
                className="w-1/2 h-full cursor-w-resize md:cursor-pointer flex items-center justify-start pl-4 md:pl-12 opacity-0 hover:opacity-100 transition-opacity"
                onClick={handlePrev}
              >
                {currentSlide > 0 && <ChevronLeft className="w-12 h-12 text-shaman-surface" />}
              </div>
              <div 
                className="w-1/2 h-full cursor-e-resize md:cursor-pointer flex items-center justify-end pr-4 md:pr-12 opacity-0 hover:opacity-100 transition-opacity"
                onClick={handleNext}
              >
                <ChevronRight className="w-12 h-12 text-shaman-surface" />
              </div>
            </div>

            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => {
                  hasSeenWorldviewSlides = true;
                  setShowSlides(false);
                }} 
                className="text-shaman-text-muted hover:text-shaman-text-light text-sm tracking-widest border border-shaman-surface px-4 py-2 rounded-sm bg-black/50 transition-colors pointer-events-auto"
              >
                SKIP
              </button>
            </div>

            <div className="relative w-full max-w-4xl flex items-center justify-center h-96">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute text-center space-y-6 md:space-y-10 w-full px-4"
                >
                  <div className="flex justify-center text-shaman-primary-glow mb-2">
                    {slides[currentSlide].icon}
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-base md:text-xl font-sans font-light text-shaman-primary tracking-widest uppercase mb-1 md:mb-2">
                      {slides[currentSlide].subtitle}
                    </h3>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-widest drop-shadow-xl font-bold leading-tight">
                      {slides[currentSlide].title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-shaman-text-muted font-light leading-relaxed max-w-2xl mx-auto break-keep">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-16 flex justify-center gap-4 z-50">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-16 bg-shaman-primary-glow shadow-[0_0_10px_rgba(255,59,59,0.8)]' : 'w-4 bg-shaman-surface'}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto py-12 px-6 relative z-10"
          >
            {/* 기존 내용 */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-shaman-text-light mb-4 animate-pulse-glow">
                세계관
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-shaman-primary to-transparent mx-auto"></div>
              <p className="mt-6 text-xl text-shaman-text-muted font-sans font-light tracking-widest uppercase">Year 2026 / South Korea</p>
              
              <button
                onClick={() => {
                  setCurrentSlide(0);
                  setDirection(1);
                  setShowSlides(true);
                }}
                className="mt-12 px-8 py-3.5 bg-shaman-surface/40 border border-shaman-surface/80 text-white font-medium rounded-lg shadow-xl hover:border-shaman-primary-glow hover:bg-shaman-surface hover:shadow-shaman-primary-glow/20 transition-all duration-300 flex items-center justify-center mx-auto group backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="tracking-wide">목차별로 다시보기</span>
                  <ChevronRight className="w-5 h-5 text-shaman-text-muted group-hover:text-shaman-primary-glow group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-10">
                <section>
                  <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-3" /> 시대 배경
                  </h3>
                  <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
                    서기 2026년 대한민국. 전 국가 기밀인 주술사에 대한 정체가 세상에 드러나며 몹시 혼란스러운 사회적 상태에 놓여 있다. 강한 원령이 너무 많이 생겨나 세계의 균형을 유지하기 위해 특급 주술사가 많이 태어난 시대이다. 전국 곳곳에서 묻지마 살인과 실종이 연달아 발생하고 있다. 일반인들은 원령의 식신(잔재)만을 보고 기이한 괴현상으로만 인지하지만, 실체는 인간을 잡아먹는 '원령'의 짓이다.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <Skull className="w-6 h-6 mr-3" /> 원령 (怨靈)
                  </h3>
                  <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
                    인간이 두려워하는 공포로부터 형상화되어 깨어난 존재들. 바퀴벌레 원령, 화염의 원령, 죽음의 원령 등 인간의 공포가 구체적일수록 그 형태와 힘이 명확해진다.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3" /> 주술고전
                  </h3>
                  <p className="text-shaman-text-muted font-sans font-light leading-relaxed mb-4">
                    국가 차원에서 비밀리에 운영하는 기관으로, 고전 내 주술사들을 교육하고 이능력을 통제하는 역할을 맡고 있다.
                  </p>
                  <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-primary">
                    <strong className="text-shaman-text-light block mb-1">숨겨진 진실</strong>
                    <p className="text-sm font-sans font-light text-shaman-text-muted">
                      자유롭게 주술사를 양성하기 위해, 고전에 입학한 학생들의 부모님은 모두 정부 기관에 의해 극비리에 암살당했다.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <Map className="w-6 h-6 mr-3" /> 환사유계 (幻死幽界)
                  </h3>
                  <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
                    한반도 정중앙에 대형 결계를 치고 그 속에서 주술사와 원령들은 목숨을 건 사투를 벌인다. 이 배틀로얄에서 승리 시 절대적인 소원권을 획득한다는 소문이 주술사들 사이에서 파다하게 돌고 있다. 소원권 자체는 사실이지만, 그 실체는 세상에서 주술을 회수하기 위해 벌인 거대한 판이다.
                  </p>
                </section>
              </div>

              <div className="space-y-10">
                <section>
                  <h3 className="text-2xl font-serif text-shaman-accent border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <Crosshair className="w-6 h-6 mr-3" /> 주력과 주술사
                  </h3>
                  <div className="text-shaman-text-muted font-sans font-light leading-relaxed mb-4 space-y-4">
                    <div>
                      <strong className="text-shaman-text-light block mb-1">주력 (呪力)과 잔예 (残穢)</strong>
                      <p>주술의 근원적인 동력원. 인간의 부정적인 감정에서 발생하며, 무의식적으로 발산하여 흘려보내는 일반인과 달리 이를 체내에 머금어 이능력으로 사용하는 자들을 주술사라 부른다. 주력을 사용한 흔적은 대상이나 공간에 '잔예'의 형태로 남는다.</p>
                    </div>
                    <div>
                      <strong className="text-shaman-text-light block mb-1">주술사 (呪術師)와 주구 (呪具)</strong>
                      <p>술식을 사용하는 자들로, 신을 몹시 증오한다. 간혹 저주가 깃들어있는 무기인 '주구'를 사용하기도 한다. 남자 술사는 주력을 각성할 때 그 저주를 감당하지 못하고 죽는 경우가 많아 여술사에 비해 수가 매우 적다.</p>
                    </div>
                    <div>
                      <strong className="text-shaman-text-light block mb-1">장막 (帳)</strong>
                      <p>비술사(일반인)의 시각으로부터 내부를 감추고, 밖으로 피해가 새어나가지 않도록 하늘에서부터 내리는 검은 돔 형태의 결계술이다.</p>
                    </div>
                  </div>
                  <ul className="text-sm space-y-2 text-shaman-text-muted/80 bg-shaman-surface/50 p-4 rounded border border-shaman-surface">
                    <li><strong className="text-shaman-text-light">특급:</strong> 국가 전복 규모의 규격 외 존재</li>
                    <li><strong className="text-shaman-text-light">1급:</strong> 주술계의 든든한 기둥</li>
                    <li><strong className="text-shaman-text-light">2급 / 3급:</strong> 일반적인 임무를 수행</li>
                  </ul>
                  <p className="text-xs text-shaman-primary mt-2">* 등급 간의 전투력 차이는 막대하여, 단 한 등급 차이라도 하위 등급이 상위 등급을 이기는 것은 사실상 불가능하다.</p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-shaman-accent border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <BrainCircuit className="w-6 h-6 mr-3" /> 술식 메커니즘
                  </h3>
                  <div className="mb-4">
                    <strong className="text-shaman-text-light block mb-1">술식 (術式)</strong>
                    <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
                      출생 시 뇌에 각인되는 고유의 능력으로, 체내의 에너지인 '주력'을 자원으로 사용한다. 술식이 완전히 소멸되면 사용자는 사망하게 된다.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-accent">
                      <strong className="text-shaman-text-light block mb-1">속박 (束縛)</strong>
                      <p className="text-sm font-sans font-light text-shaman-text-muted">
                        스스로에게 주술적인 패널티나 제약을 부여함으로써 발생하는 메리트를 취하는 법칙.
                      </p>
                    </div>
                    <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-accent">
                      <strong className="text-shaman-text-light block mb-1">반전술식 (反轉術式)</strong>
                      <p className="text-sm font-sans font-light text-shaman-text-muted">
                        고도로 발달된 주력 조작으로 끊어진 신체를 완벽히 회복하는 기술. 이 긍정 에너지를 원령에게 직접 주입하면 확실하게 제령할 수 있다. 특급 주술사는 이 기술을 반드시 사용할 수 있다.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-shaman-accent border-b border-shaman-surface pb-2 mb-4 flex items-center">
                    <Zap className="w-6 h-6 mr-3" /> 주술전의 극치
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-black/20 p-4 border-l-2 border-shaman-primary-glow">
                      <strong className="text-shaman-text-light block mb-1">영역전개 (領域展開) & 편린영역 (片鱗領域)</strong>
                      <p className="text-sm font-sans font-light text-shaman-text-muted mb-2">
                        <strong className="text-shaman-text-light">영역전개:</strong> 결계를 펼쳐 자신의 술식이 필중하도록 하는 주술전의 정점이자 필살기. 1급 이상 주술사는 반드시 사용할 수 있다. 사용 직후에는 술식이 타버려 몇 분간 술식을 사용할 수 없게 되는 리스크가 따른다. 대응법은 간이영역이나 동일한 영역전개를 통한 맞불.
                      </p>
                      <p className="text-sm font-sans font-light text-shaman-text-muted">
                        <strong className="text-shaman-text-light">편린영역:</strong> 주변에 작은 결계를 펼쳐 적의 영역 필중 효과를 일시적으로 중화시키는 기술.
                      </p>
                    </div>
                    <div className="bg-black/20 p-4 border-l-2 border-shaman-primary-glow">
                      <strong className="text-shaman-text-light block mb-1">공진 (共振)</strong>
                      <p className="text-sm font-sans font-light text-shaman-text-muted">
                        전투 중 각각의 주력이 동일한 출력으로 충돌 시 공간의 왜곡이 발생한다. 공진을 경험한 각 술사는 잠시 주력의 핵심을 깨닫게 되는 극한의 몰입(Zone) 상태에 돌입한다.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldviewSection;
