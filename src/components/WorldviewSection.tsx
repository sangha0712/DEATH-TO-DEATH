import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Crosshair, BrainCircuit, Skull, Map, Shield } from 'lucide-react';

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
              <Map className="w-6 h-6 mr-3" /> 환사유계 (幻死幽界)
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed">
              한반도 정중앙에 대형 결계를 치고 그 속에서 주술사와 주령들은 목숨을 건 사투를 벌인다. 이 배틀로얄에서 승리 시 절대적인 소원을 획득한다는 소문이 주술사들 사이에서 파다하게 돌고 있으나, 그 실체는 세상에서 주술을 완전히 지워버리려는 절대신들의 어두운 계획이다.
            </p>
          </section>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-2xl font-serif text-shaman-accent border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <Crosshair className="w-6 h-6 mr-3" /> 주술사 (呪術師)
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed mb-4">
              주력을 사용해 주령을 제령하는 이능력자. 남성 주술사는 각성 시 저주를 감당하지 못하고 사망하는 경우가 잦아 극히 그 수가 적다.
            </p>
            <ul className="text-sm space-y-2 text-shaman-text-muted/80 bg-shaman-surface/50 p-4 rounded border border-shaman-surface">
              <li><strong className="text-shaman-text-light">특급:</strong> 국가 전복 규모의 규격 외 존재</li>
              <li><strong className="text-shaman-text-light">1급:</strong> 주술계의 든든한 기둥</li>
              <li><strong className="text-shaman-text-light">2급 / 3급:</strong> 일반적인 임무를 수행</li>
            </ul>
            <p className="text-xs text-shaman-primary mt-2">* 등급 간의 전투력 차이는 막대하여, 단 한 등급 차이라도 하위 등급이 상위 등급을 이기는 것은 사실상 불가능하다.</p>
          </section>

          <section>
            <h3 className="text-2xl font-serif text-shaman-accent border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <BrainCircuit className="w-6 h-6 mr-3" /> 술식 (術式)
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed mb-4">
              태어나면서 뇌에 각인되는 고유의 능력. 체내의 '주력'을 자원으로 사용한다. 
              술식이 인위적으로 소멸되면 사용자는 즉사한다. 타인에게 양도가 가능하지만, 두 개 이상의 술식을 품게 되면 충돌로 인해 모든 술식이 소멸된다.
            </p>
            <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-primary">
              <strong className="text-shaman-primary-glow block mb-1">반전술식 (反轉術式)</strong>
              <p className="text-sm font-sans font-light text-shaman-text-muted">
                고도로 발달된 마이너스(-) 주력을 충돌시켜 플러스(+) 에너지를 만드는 기술. 신체 회복에 쓰이며, 순수 마이너스 덩어리인 주령을 향해 직접 방출하면 치명적인 피해를 주어 제령할 수 있다.
              </p>
            </div>
            <div className="bg-shaman-surface/50 p-4 border-l-2 border-shaman-primary mt-4">
              <strong className="text-shaman-primary-glow block mb-1">공명 (共鳴)</strong>
              <p className="text-sm font-sans font-light text-shaman-text-muted">
                죽음을 앞두는 등 극한의 흥분 상태에서 주력의 본질에 대해 깨달으며, 술식들의 출력과 신체능력이 극적으로 성장하는 현상. 이 상태에 이르면 대상의 뇌가 강하게 울리는 묘사가 수반된다.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-serif text-shaman-accent border-b border-shaman-surface pb-2 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-3" /> 주술고전
            </h3>
            <p className="text-shaman-text-muted font-sans font-light leading-relaxed mb-4">
              전 세계의 주요 국가에 하나씩 존재하는 기관. 국가 차원에서 비밀리에 운영하며, 주술사들의 술식을 등록하고 이능력을 통제, 훈련시키는 역할을 맡고 있다.
            </p>
            <div className="bg-black/20 p-4 border-l-2 border-shaman-accent">
              <strong className="text-shaman-text-light block mb-1">숨겨진 진실</strong>
              <p className="text-sm font-sans font-light text-shaman-text-muted">
                주술사를 국가의 통제하에 자유롭게 양성하기 위해, 고전에 입학한 학생들의 부모님은 모두 국가 기관에 의해 극비리에 암살당했다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default WorldviewSection;
