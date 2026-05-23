import React, { useState } from 'react';
import Particles from './components/Particles';
import WebtoonSection from './components/WebtoonSection';
import CharactersSection from './components/CharactersSection';
import WorldviewSection from './components/WorldviewSection';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, Users, Globe } from 'lucide-react';

type View = 'intro' | 'hub' | 'section';
type Tab = 'webtoon' | 'characters' | 'worldview';

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

  const handleJoin = () => {
    setIsEntering(true);
    setTimeout(() => {
      setView('hub');
      setIsEntering(false);
    }, 1500); // Wait for ripple animation to finish
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
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-widest text-shaman-text-light mb-12 animate-pulse-glow text-center">
              幻死幽界<br />
              <span className="text-2xl md:text-4xl text-shaman-text-muted tracking-widest font-sans font-light mt-4 block">주술의 시대</span>
            </h1>
            <button
              onClick={handleJoin}
              disabled={isEntering}
              className={`relative px-12 py-4 bg-transparent border transition-all duration-300 rounded-sm font-serif text-2xl tracking-widest overflow-hidden group border-shaman-primary-glow text-shaman-primary-glow hover:bg-shaman-primary-glow/10 hover:shadow-[0_0_20px_rgba(255,59,59,0.5)]`}
            >
              <div className="absolute inset-0 bg-shaman-primary opacity-0 group-hover:opacity-20 transition-opacity" />
              {buttonText}
            </button>
          </div>
          {isEntering && (
            <div className="absolute inset-0 z-50 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-shaman-primary-glow animate-[ripple_1.5s_ease-out_forwards] mix-blend-screen" />
              </div>
              <div className="absolute inset-0 bg-shaman-bg animate-[glitch-fade_1.5s_ease-in-out_forwards]" />
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
            <div className="grid md:grid-cols-3 gap-8">
              <HubCard 
                title="웹툰" 
                icon={<BookOpen className="w-12 h-12 mb-6" />} 
                onClick={() => handleSelectSection('webtoon')} 
              />
              <HubCard 
                title="캐릭터" 
                icon={<Users className="w-12 h-12 mb-6" />} 
                onClick={() => handleSelectSection('characters')} 
              />
              <HubCard 
                title="세계관" 
                icon={<Globe className="w-12 h-12 mb-6" />} 
                onClick={() => handleSelectSection('worldview')} 
              />
            </div>
          </motion.div>
        </div>
      )}

      {view === 'section' && (
        <>
          <nav className="relative z-10 border-b border-shaman-surface bg-shaman-bg/80 backdrop-blur-md sticky top-0">
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
                  active={activeTab === 'worldview'} 
                  onClick={() => setActiveTab('worldview')}
                >
                  세계관
                </NavItem>
              </div>
            </div>
          </nav>

          <main className="relative z-10 flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'webtoon' && <WebtoonSection key="webtoon" />}
              {activeTab === 'characters' && <CharactersSection key="characters" />}
              {activeTab === 'worldview' && <WorldviewSection key="worldview" />}
            </AnimatePresence>
          </main>
        </>
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
    className="group relative h-64 flex flex-col items-center justify-center border border-shaman-surface bg-shaman-surface/40 hover:bg-shaman-surface/80 hover:border-shaman-primary-glow transition-all duration-500 rounded-sm overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-shaman-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 text-shaman-text-muted group-hover:text-shaman-primary-glow transition-colors duration-300 flex flex-col items-center">
      {icon}
      <h3 className="text-2xl font-serif tracking-widest">{title}</h3>
    </div>
  </button>
);
