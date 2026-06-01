import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X } from 'lucide-react';
import { CharacterModal } from './CharacterModal';

const factionsConfig = [
  { id: 'jujutsu', name: '주술 고교', desc: '국가 차원에서 비밀리에 운영하는 기관' },
  { id: 'eclipse', name: '이클립스', desc: '알 수 없는 목적을 지닌 세력' },
  { id: 'sanctuary', name: '백계성역', desc: '타락한 신앙과 기도의 결정체' },
  { id: 'gods', name: '절대신', desc: '세상의 이치를 조율하는 초월적 존재들' },
  { id: 'hwansa', name: '환사유계 내부', desc: '결계 내부를 배회하는 존재들' },
  { id: 'gov', name: '중앙 정부', desc: '국가의 통제를 관장하는 중추' },
  { id: 'grave', name: '그레이브', desc: '어둠 속에 숨겨진 묘지의 거주자들' },
];

export const rawCharacters = [
  { id: 0, name: "레이", faction: "gods", grade: "3급", gender: "女", age: "124", technique: "도혼술식 (잔혼을 불러 적의 혼·움직임을 끌어당김)", domain: "명천송혼 (저승의 강이 영역 내 혼을 강제 인도·속박)", tags: ["차분", "몽환", "상냥한듯섬뜩", "영혼인도자", "물빛저승계"] },
  { id: 1, name: "레이사", faction: "hwansa", grade: "1급", gender: "女", age: "16", technique: "희령식신술 (마스코트 주령식신 소환·지휘)", domain: "희령유원 (식신이 무한증식해 포위·돌격·자폭)", tags: ["활발", "장난", "광기", "소라토와 남매"] },
  { id: 2, name: "렌", faction: "hwansa", grade: "2급", gender: "男", age: "17", technique: "주정술식 (주력을 푸른 결정·파편·칼날로 실체화)", domain: "창정쇄계 (주력이 결정 파편으로 실체화되어 전방위 절단·폭격)", tags: ["냉정", "무심", "정밀", "주술사 해부·분석에 흥미"] },
  { id: 3, name: "리아", faction: "grave", grade: "특급", gender: "女", age: "22", technique: "환감술식 (시선 내 좌표로 자유롭게 이동)", domain: "미등환가 (좌표를 붕괴시켜 자신만이 이동)", tags: ["나른", "능글", "기만적"] },
  { id: 4, name: "리안", faction: "grave", grade: "1급", gender: "男", age: "17", technique: "영잠술식 (그림자 속을 잠행해 사각에서 급습)", domain: "암영복궁 (모든 사각에서 그림자 급습 발생)", tags: ["냉정", "과묵", "은밀", "정부에게 밉보여 고전 퇴학"] },
  { id: 5, name: "마이", faction: "jujutsu", grade: "2급", gender: "女", age: "17", technique: "명자술식 (붓으로 쓴 글자를 명령으로 강제)", domain: "칙자금계 (글자가 법칙이 되어 명령을 강제)", tags: ["차분", "과묵", "서늘함", "거대 붓"] },
  { id: 6, name: "미오", faction: "gov", grade: "3급", gender: "女", age: "17", technique: "착마술식 (움직임·인식 글리치화)", domain: "착마전계 (감각·술식흐름 오류화)", tags: ["장난", "능글", "정보 담당"] },
  { id: 7, name: "미카", faction: "hwansa", grade: "3급", gender: "女", age: "15", technique: "기하술식 (삼각형·선·면으로 절단·구속·방어)", domain: "삼각절계 (삼각좌표가 대상을 절단·고정·압축)", tags: ["냉정", "분석적", "무표정"] },
  { id: 8, name: "미하루", faction: "grave", grade: "준1급", gender: "女", age: "17", technique: "괴소술식 (웃음으로 혼란 증폭+그림자손 공격)", domain: "광소귀옥 (웃음소리로 판단붕괴·귀신손 속박)", tags: ["광기", "장난", "잔혹", "고전에서 도망침", "모모카와 자매"] },
  { id: 9, name: "아오바", faction: "eclipse", grade: "1급", gender: "女", age: "23", technique: "예전술식 (네온·전류로 고속돌진+감전폭발)", domain: "예전마가 (네온 전류가 자동추적·감전)", tags: ["광기", "활발", "쾌락전투", "전류계", "웃으며 돌진"] },
  { id: 10, name: "세아", faction: "sanctuary", grade: "특급", gender: "女", age: "26", technique: "신호술식 (손짓·표식으로 정지·진행·전환 강제)", domain: "홍등령가 (모든 행동에 신호명령 강제적용)", tags: ["무심", "냉정", "명령형", "신호계"] },
  { id: 11, name: "세츠", faction: "jujutsu", grade: "특급", gender: "女", age: "17", technique: "삼유술식 (식물 급성장+재생으로 구속·회복)", domain: "삼라생정 (숲이 폭주성장해 적 구속·술자 재생)", tags: ["온화", "침착", "끈질김", "고전 학장"] },
  { id: 12, name: "스이카", faction: "sanctuary", grade: "2급", gender: "女", age: "17", technique: "궤정술식 (다음 동작·궤도 지정)", domain: "정궤회랑 (움직임을 지정 궤도에 강제고정)", tags: ["냉정", "무표정", "통제적", "고전 출신 천재"] },
  { id: 13, name: "시이라", faction: "sanctuary", grade: "2급", gender: "女", age: "17", technique: "비상술식 (바람길·공중발판으로 비상·급선회)", domain: "상천유정 (공중발판·상승기류로 초고속 비행·급습)", tags: ["상냥", "여유", "날렵", "공중기동계"] },
  { id: 14, name: "오하인", faction: "gov", grade: "특급", gender: "女", age: "17", technique: "청음술식 (소리·진동을 읽고 잔향 참격 발사)", domain: "잔향영역 (소리·진동을 지배해 잔향참격 자동유도)", tags: ["냉정", "과묵", "전술적", "소리의 마녀"] },
  { id: 15, name: "루나", faction: "grave", grade: "준2급", gender: "女", age: "17", technique: "몽면술식 (꿈안개로 감각·반응 교란)", domain: "몽옥야장 (꿈의 밤장막으로 환각·잔상 생성)", tags: ["나른", "장난", "몽환", "리아 껌딱지", "리아가 학대에서 구원"] },
  { id: 16, name: "유승아", faction: "eclipse", grade: "1급", gender: "女", age: "32", technique: "안각술식 (마안으로 약점표식 부여·타격증폭)", domain: "각안단역 (대상 전부에 약점표식 강제부여)", tags: ["여유", "냉정", "능글", "약점표식계", "확정타격"] },
  { id: 17, name: "유이카", faction: "jujutsu", grade: "1급", gender: "女", age: "19", technique: "흡명화술식 (꽃·덩굴로 생명력·저주력 흡수)", domain: "탈명화원 (꽃과 덩굴이 적을 휘감아 생명력·저주력 강제흡수)", tags: ["차분", "순함", "주술 고교 교사"] },
  { id: 18, name: "시온", faction: "jujutsu", grade: "2급", gender: "女", age: "17", technique: "경반술식 (공격을 반사·왜곡·복제)", domain: "흑월천관 (빛과 그림자의 경계에서 참격 발생)", tags: ["쿨", "털털"] },
  { id: 19, name: "카논", faction: "jujutsu", grade: "1급", gender: "女", age: "17", technique: "주포술식 (압축 주력포 발사)", domain: "포화굉역 (압축 주력포가 전방위 연속포격)", tags: ["장난", "여유", "화력광"] },
  { id: 20, name: "코하루", faction: "hwansa", grade: "3급", gender: "男", age: "16", technique: "도약술식 (순간 도약과 공중 기동으로 궤도란)", domain: "도공유렵 (비정상적 궤도 움직임 가능)", tags: [] },
  { id: 21, name: "미사", faction: "sanctuary", grade: "특급", gender: "女", age: "24", technique: "모독성흔 (성흔과 기도를 저주로 뒤틀어 속박·처벌)", domain: "타성참계 (시선 내 성흔·사슬·가시로 속박)", tags: ["융통성", "요망", "15세기의 수녀", "타락의 원인을 주술로 봄"] },
  { id: 22, name: "아카네", faction: "eclipse", grade: "특급", gender: "男", age: "24", technique: "식월술식 (일식·월식의 그림자로 참격을 만들어냄)", domain: "흑월천관 (빛과 그림자의 경계에서 참격 발생)", tags: ["열정", "냉철", "16세기의 사람", "배신당해 환멸"] },
  { id: 23, name: "프리아", faction: "gods", grade: "1급", gender: "女", age: "200", technique: "창혈술식 (푸른 혈류를 사출·응고·관통)", domain: "창혈침계 (혈류가 자동추적·관통·속박)", tags: ["차분", "냉정", "집요", "인간에 대한 생각이 많음"] },
  { id: 24, name: "프리엘", faction: "gods", grade: "특급", gender: "女", age: "2000+", technique: "원류술식 (순수 주력을 파동·결정·생기로 실체화)", domain: "원해성궁 (모든 주력을 환원·흡수·재구성)", tags: ["활기", "자애", "초월", "주력의 시초"] },
  { id: 25, name: "리츠카", faction: "eclipse", grade: "특급", gender: "女", age: "25", technique: "단죄재판 (상대의 유죄 판결에 따라 제약·봉인·처형)", domain: "무죄 없는 법정 (유죄 판결 시 처형)", tags: ["진중", "신념", "전 검사", "사법부에 환멸"] },
  { id: 26, name: "헤이즈", faction: "jujutsu", faction2: "gov", grade: "특급", gender: "男", age: "25", technique: "편위술식 (대상·공격의 방향·속도 편향 조절)", domain: "천편역장 (운동벡터를 지배해 강제편향·압쇄)", tags: ["여유", "능글", "고전 교사", "정부 소속", "레이사와 남매", "현대최강"] },
  { id: 27, name: "모모카", faction: "jujutsu", grade: "3급", gender: "女", age: "16", technique: "유성탄막술식 (별빛 탄환과 유성 궤도로 적을 포위·탄막)", domain: "성추천막 (유성 탄막이 전방위로 낙하·추적)", tags: ["활기", "바보", "미하루와 자매"] },
  { id: 28, name: "이로하", faction: "gov", grade: "특급", gender: "女", age: "452", technique: "백봉술식 (빛의 봉합선으로 공간·움직임·술식 봉인)", domain: "백계봉정 (모든 틈을 봉합선으로 꿰매 봉인)", tags: ["차분", "상냥", "집요", "소라토의 누나", "전 절대신"] },
  { id: 29, name: "소라토", faction: "gov", grade: "특급", gender: "男", age: "357", technique: "청선술식 (푸른 선으로 공간·궤도 절단)", domain: "창계단봉 (경계를 공간째 절단)", tags: ["냉정", "과묵", "정밀", "전 절대신", "이로하와 남매"] },
];

const CharacterCard = ({ char, onClick }: { char: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="relative cursor-pointer group rounded-sm overflow-hidden border border-shaman-surface hover:border-shaman-primary-glow transition-all duration-300 aspect-[3/4] bg-shaman-surface/20"
  >
    <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-105`}>
      <img src={`https://igx.kr/r/L2/${char.id}/0`} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 opacity-80 group-hover:opacity-100" />

    <div className="absolute top-2 left-2 right-2 flex justify-end pointer-events-none">
      {char.grade && (
        <span className="text-[10px] font-sans font-bold bg-black/60 text-shaman-primary-glow px-1.5 py-0.5 rounded border border-shaman-primary-glow/30 drop-shadow-sm">
          {char.grade}
        </span>
      )}
    </div>
    
    <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex flex-col justify-end">
      <h3 className="text-xl font-serif font-bold text-white drop-shadow-md leading-tight">{char.name}</h3>
      {char.age && (
        <span className="text-[10px] text-shaman-text-muted mt-0.5 font-light">
          {char.gender} / {char.age}세
        </span>
      )}
    </div>
  </div>
);

const CharactersSection = () => {
  const [selectedChar, setSelectedChar] = useState<any>(null);

  // Close modal when pressing escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedChar(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-shaman-text-light mb-4 animate-pulse-glow">
          주술사 명부
        </h2>
        <p className="mt-6 text-xl text-shaman-text-muted font-sans font-light max-w-2xl mx-auto">
          환사유계에 발을 들인 각 세력의 이능력자들입니다.
        </p>
      </div>

      <div className="space-y-24">
        {factionsConfig.map((faction) => {
          const members = rawCharacters.filter(c => c.faction === faction.id || c.faction2 === faction.id);
          
          if (members.length === 0) return null;

          return (
            <div key={faction.id} className="space-y-6">
              <div className="border-b border-shaman-surface pb-3">
                <h3 className="text-2xl font-serif text-shaman-text-light flex items-center mb-1">
                  <Shield className="w-5 h-5 mr-3 text-shaman-accent" />
                  {faction.name}
                </h3>
                <p className="text-sm text-shaman-text-muted font-sans font-light pl-8">
                  {faction.desc}
                </p>
              </div>

              {/* Denser grid layout for smaller character cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                {members.map((char) => (
                  <CharacterCard key={`${faction.id}-${char.id}`} char={char} onClick={() => setSelectedChar(char)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-24 pt-8 border-t border-shaman-surface text-center">
         <p className="text-shaman-text-muted/60 text-sm font-light italic">
           * 아직 능력이나 배경 등이 상세히 파악되지 않은 인물들이 존재합니다.
         </p>
      </div>

      {/* Detail Modal */}
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

export default CharactersSection;
