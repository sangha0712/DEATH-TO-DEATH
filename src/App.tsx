import React, { useState } from 'react';
import Particles from './components/Particles';
import WebtoonSection from './components/WebtoonSection';
import CharactersSection from './components/CharactersSection';
import WorldviewSection from './components/WorldviewSection';
import FactionsSection from './components/FactionsSection';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, Users, Globe, Shield } from 'lucide-react';

type View = 'intro' | 'hub' | 'section';
type Tab = 'webtoon' | 'characters' | 'factions' | 'worldview';

export default function App() {
  const [view, setView] = useState<View>('intro');
  const [activeTab, setActiveTab] = useState<Tab>('webtoon');
  const [isEntering, setIsEntering] = useState(false);
  const [buttonText, setButtonText] = useState('참가');
  const [isGlitching, setIsGlitching] = useState(false);

  React.useEffect(() => {
    if (view !== 'intro' || isEntering) return;

    const interval = setInterval(() => {
      // Periodic glitch chance
      if (Math.random() > 0.5) {
        setIsGlitching(true);
        setButtonText(Math.random() > 0.5 ? '도망쳐' : '살려줘');
        
        // Reset after a brief moment
        setTimeout(() => {
          setIsGlitching(false);
          setButtonText('참가');
        }, 150 + Math.random() * 200);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [view, isEntering]);

  React.useEffect(() => {
    const urlsToPreload: string[] = [];
    
    // 1. 최우선 순위: 기본 화면에 필요한 이미지 (웹툰, 캐릭터 썸네일)
    for (let i = 0; i <= 4; i++) {
        urlsToPreload.push(`https://igx.kr/p/L2/32/${i}`);
    }
    for (let id = 0; id <= 29; id++) {
        urlsToPreload.push(`https://igx.kr/r/L2/${id}/0`);
    }

    // 2. 후순위: 모든 감정 표현 (사이트 접속 직후 백그라운드에서 끊임없이 로딩)
    for (let id = 0; id <= 29; id++) {
        for (let emo = 1; emo <= 15; emo++) {
            urlsToPreload.push(`https://igx.kr/r/L2/${id}/${emo}`);
        }
    }

    let index = 0;
    
    // onload 이벤트에 의존하면 하나라도 실패/지연 시 로딩이 완전히 멈추는 버그가 있습니다.
    // setInterval을 활용해 브라우저 큐에 주기적으로 밀어넣어 중단 없이 100% 로딩되게 설정합니다.
    const interval = setInterval(() => {
      if (index >= urlsToPreload.length) {
        clearInterval(interval);
        return;
      }
      
      // 100ms마다 5장씩 브라우저 네트워크 대기열에 추가 (빠르면서도 서버에 무리가 가지 않는 속도)
      // 총 480장 로딩에 약 10초 정도 소요되며 끊김 없이 캐싱됩니다.
      for (let k = 0; k < 5; k++) {
        if (index < urlsToPreload.length) {
          const img = new Image();
          img.referrerPolicy = "no-referrer";
          img.src = urlsToPreload[index];
          index++;
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleJoin = () => {
    setIsEntering(true);
    setTimeout(() => {
      setView('hub');
      setIsEntering(false);
    }, 2500); // Wait for simulation loading
  };

  const handleSelectSection = (tab: Tab) => {
    setActiveTab(tab);
    setView('section');
  };

  return (
    <div className="min-h-screen font-sans relative selection:bg-shaman-primary selection:text-white bg-shaman-bg flex flex-col">
      <Particles />

      {view === 'intro' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <h1 className={`text-6xl md:text-8xl font-serif font-bold tracking-widest text-shaman-text-light mb-12 animate-pulse-glow text-center transition-all duration-1000 ${isEntering ? 'opacity-0 scale-110 filter blur-md' : ''}`}>
              幻死幽界<br />
              <span className="text-2xl md:text-4xl text-shaman-text-muted tracking-widest font-sans font-light mt-4 block">주술의 시대</span>
            </h1>
            
            <AnimatePresence mode="wait">
              {!isEntering ? (
                <motion.button
                  key="join-btn"
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleJoin}
                  className="relative px-12 py-4 bg-transparent border transition-all duration-300 rounded-sm font-serif text-2xl tracking-widest overflow-hidden group border-shaman-primary-glow text-shaman-primary-glow hover:bg-shaman-primary-glow/10 hover:shadow-[0_0_20px_rgba(255,59,59,0.5)]"
                >
                  <div className="absolute inset-0 bg-shaman-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                  {buttonText}
                </motion.button>
              ) : (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-12 h-12 border border-shaman-surface border-t-shaman-primary-glow rounded-full animate-spin"></div>
                  <p className="text-shaman-primary-glow tracking-[0.4em] font-light text-sm md:text-base animate-pulse-glow bg-shaman-bg/50 px-4 py-2 rounded-full backdrop-blur-sm">데이터 동기화 중...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isEntering && (
            <div className="absolute inset-0 z-50 pointer-events-none">
              <div className="absolute inset-0 bg-shaman-bg animate-[glitch-fade_2.5s_ease-in-out_forwards]" />
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwSDF2MUgweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHBhdGggZD0iTTMgMUgydjFIM3oiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4zIi8+CjxwYXRoIGQ9Ik0wIDJIMXYxSDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8cGF0aCBkPSJNMiAzSDN2MUgyeiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPC9zdmc+')] animate-[noise-shift_0.2s_linear_infinite]" />
            </div>
          )}
        </div>
      )}

      {view === 'hub' && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl"
          >
            <h2 className="text-4xl font-serif text-center text-shaman-text-light mb-16 tracking-widest">
              다음 영역을 선택하십시오
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <HubCard 
                title="웹툰" 
                icon={<BookOpen className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />} 
                onClick={() => handleSelectSection('webtoon')} 
              />
              <HubCard 
                title="캐릭터" 
                icon={<Users className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />} 
                onClick={() => handleSelectSection('characters')} 
              />
              <HubCard 
                title="세력" 
                icon={<Shield className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />} 
                onClick={() => handleSelectSection('factions')} 
              />
              <HubCard 
                title="세계관" 
                icon={<Globe className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />} 
                onClick={() => handleSelectSection('worldview')} 
              />
            </div>
          </motion.div>
        </div>
      )}

      {view === 'section' && (
        <div className="flex flex-col flex-1">
          <nav className="fixed top-0 left-0 right-0 z-50 border-b border-shaman-surface bg-shaman-bg/80 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
              <button 
                onClick={() => setView('hub')}
                className="text-2xl font-serif font-bold tracking-widest text-shaman-primary-glow mb-4 md:mb-0 hover:text-shaman-text-light transition-colors"
                title="홈으로 돌아가기"
              >
                환사유계
              </button>
              <div className="flex space-x-4 md:space-x-8">
                <NavItem 
                  active={activeTab === 'webtoon'} 
                  onClick={() => setActiveTab('webtoon')}
                >
                  웹툰
                </NavItem>
                <NavItem 
                  active={activeTab === 'characters'} 
                  onClick={() => setActiveTab('characters')}
                >
                  캐릭터
                </NavItem>
                <NavItem 
                  active={activeTab === 'factions'} 
                  onClick={() => setActiveTab('factions')}
                >
                  세력
                </NavItem>
                <NavItem 
                  active={activeTab === 'worldview'} 
                  onClick={() => setActiveTab('worldview')}
                >
                  세계관
                </NavItem>
              </div>
            </div>
          </nav>

          <main className="relative z-10 flex-1 pt-[120px] md:pt-[80px]">
            <AnimatePresence mode="wait">
              {activeTab === 'webtoon' && <WebtoonSection key="webtoon" />}
              {activeTab === 'characters' && <CharactersSection key="characters" />}
              {activeTab === 'factions' && <FactionsSection key="factions" />}
              {activeTab === 'worldview' && <WorldviewSection key="worldview" />}
            </AnimatePresence>
          </main>
        </div>
      )}

      {/* Footer Vignette */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-shaman-bg to-transparent pointer-events-none z-0" />
    </div>
  );
}

const NavItem = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`pb-2 px-1 text-sm md:text-base tracking-wide transition-all duration-300 relative ${
      active ? 'text-shaman-text-light' : 'text-shaman-text-muted hover:text-shaman-text-light'
    }`}
  >
    {children}
    <div 
      className={`absolute bottom-0 left-0 w-full h-[2px] bg-shaman-primary glow transition-transform duration-300 origin-left ${
        active ? 'scale-x-100 shadow-[0_0_8px_#ff3b3b]' : 'scale-x-0'
      }`} 
    />
  </button>
);

const HubCard = ({ title, icon, onClick }: { title: string; icon: React.ReactNode; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="group relative h-48 md:h-64 flex flex-col items-center justify-center border border-shaman-surface bg-shaman-surface/40 hover:bg-shaman-surface/80 hover:border-shaman-primary-glow transition-all duration-500 rounded-sm overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-shaman-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 text-shaman-text-muted group-hover:text-shaman-primary-glow transition-colors duration-300 flex flex-col items-center">
      {icon}
      <h3 className="text-2xl font-serif tracking-widest">{title}</h3>
    </div>
  </button>
);
