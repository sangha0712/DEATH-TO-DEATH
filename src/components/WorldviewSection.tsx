import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Crosshair, BrainCircuit, Skull, Map, Shield, Zap } from 'lucide-react';

const WorldviewSection = () => {
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
          세계관
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-shaman-primary to-transparent mx-auto"></div>
        <p className="mt-6 text-xl text-shaman-text-muted font-sans font-light tracking-widest uppercase">Year 4443 / South Korea</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-10">
          <section>
            <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <ShieldAlert className="w-6 h-6 mr-3" /> 시대 배경
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
              서기 4443년 대한민국. 전 국가 기밀인 주술사에 대한 정체가 세상에 드러나며 몹시 혼란스러운 사회적 상태에 놓여 있다. 전국 곳곳에서 묻지마 살인과 실종이 연달아 발생하고 있다. 일반인들은 이를 주령의 식신(잔재)만을 보고 기이한 괴현상으로만 인지하지만, 실체는 인간을 잡아먹는 '주령'의 짓이다.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <Skull className="w-6 h-6 mr-3" /> 주령 (呪靈)
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
              인간이 두려워하는 공포로부터 형상화되어 깨어난 존재들. 바퀴벌레 주령, 화염의 주령, 죽음의 주령 등 인간의 공포가 구체적일수록 그 형태와 힘이 명확해진다.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3" /> 주술고전
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed mb-4">
              전 세계의 주요 국가에 하나씩 존재하는 기관. 국가 차원에서 비밀리에 운영하며, 고전 내 주술사들을 교육하고 이능력을 통제하는 역할을 맡고 있다.
            </p>
            <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-primary">
              <strong className="text-shaman-text-light block mb-1">숨겨진 진실</strong>
              <p className="text-sm font-sans font-light text-shaman-text-muted">
                자유롭게 주술사를 양성하기 위해, 고전에 입학한 학생들의 부모님은 모두 국가 기관에 의해 극비리에 암살당했다.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-serif text-shaman-primary-glow border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <Map className="w-6 h-6 mr-3" /> 환사유계 (幻死幽界)
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
              한반도 정중앙에 대형 결계를 치고 그 속에서 주술사와 주령들은 목숨을 건 사투를 벌인다. 이 배틀로얄에서 승리 시 절대적인 소원을 획득한다는 소문이 주술사들 사이에서 파다하게 돌고 있으나, 그 소원권은 거짓이며 실체는 세상에서 주술을 완전히 지워버리려는 절대신들의 어두운 계획이다.
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
                <p>주력을 다루어 주령을 제령하는 통제자들. 본래부터 저주가 깃들어있는 무기인 '주구'를 사용하여 육탄전을 벌이기도 한다. 남자 술사는 주력을 각성할 때 그 저주를 감당하지 못하고 사망하는 경우가 잦아 극히 그 수가 적다.</p>
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
                출생 시 뇌에 각인되는 고유의 능력으로, 체내의 '주력'을 자원으로 사용한다. 술식이 완전히 소멸되면 사용자는 사망한다. 타인 양도는 가능하나 2개 이상 소지 시 술식이 둘 다 소멸된다.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-accent">
                <strong className="text-shaman-text-light block mb-1">속박 (束縛)</strong>
                <p className="text-sm font-sans font-light text-shaman-text-muted">
                  스스로에게 주술적인 패널티나 제약을 부여함으로써 발생하는 메리트를 취하는 주술의 등가교환 법칙.
                </p>
              </div>
              <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-accent">
                <strong className="text-shaman-text-light block mb-1">천여주박 (天与呪縛)</strong>
                <p className="text-sm font-sans font-light text-shaman-text-muted">
                  태어날 때부터 육체에 강제적으로 부여된 선천적 속박. 주력을 전혀 다룰 수 없게 되는 대신 상식을 초월한 압도적인 신체 능력을 얻는 등 극단적인 교환이 성립된다.
                </p>
              </div>
              <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-accent">
                <strong className="text-shaman-text-light block mb-1">반전술식 (反轉術式)</strong>
                <p className="text-sm font-sans font-light text-shaman-text-muted">
                  고도로 발달된 주력 조작으로 신체를 회복하는 기술. 단단한 긍정 에너지를 주령에게 직접 주입하면 확실하게 제령할 수 있다.
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
                <strong className="text-shaman-text-light block mb-1">영역전개 (領域展開)</strong>
                <p className="text-sm font-sans font-light text-shaman-text-muted">
                  결계를 펼쳐 자신의 술식이 필중하도록 하는 주술전의 정점이자 필살기. 사용 직후에는 술식이 타버려 몇 분간 술식을 사용할 수 없게 되는 리스크가 따른다.
                </p>
              </div>
              <div className="bg-black/20 p-4 border-l-2 border-shaman-primary-glow">
                <strong className="text-shaman-text-light block mb-1">극번 (極ノ番)</strong>
                <p className="text-sm font-sans font-light text-shaman-text-muted">
                  각 술식의 극치에 달한 기술. 영역전개에 버금가는 위력을 지닌 준 필살기이다.
                </p>
              </div>
              <div className="bg-black/20 p-4 border-l-2 border-shaman-primary-glow">
                <strong className="text-shaman-text-light block mb-1">흑섬 (黑閃)</strong>
                <p className="text-sm font-sans font-light text-shaman-text-muted">
                  타격과의 오차가 0.000001초 이내에 주력이 충돌했을 때 발생하는 공간의 왜곡. 이때 발생하는 타격의 위력은 평소의 2.5승으로 증가하며 검은 빛의 에너지가 번쩍인다. 흑섬을 경험한 술사는 일시적으로 주력의 핵심을 깨닫게 되는 극한의 몰입(Zone) 상태에 돌입한다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default WorldviewSection;
