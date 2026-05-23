import React, { useEffect, useState } from 'react';

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; size: string; duration: string; delay: string; color: string }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `-${Math.random() * 20}s`, // Negative delay to start mid-animation
      color: Math.random() > 0.7 ? 'bg-shaman-primary-glow' : 'bg-shaman-accent'
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute bottom-0 rounded-full ${p.color} blur-[1px] opacity-60 animate-float-up mix-blend-screen shadow-[0_0_8px_rgba(255,255,255,0.4)]`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-shaman-bg via-transparent to-shaman-bg opacity-80" />
    </div>
  );
};

export default Particles;
