
import React, { useState, useEffect, useRef } from 'react';
import { Award } from 'lucide-react';

interface Game {
  title: string;
  visits: string;
  img: string;
  link?: string;
  isFlagship?: boolean;
}

const rawGames: Game[] = [
  { 
    title: "Steal A Brainrot", 
    visits: "55.5B+", 
    img: "https://i.ibb.co.com/Cp3M7tc3/robabrainrot.png", 
    link: "https://www.roblox.com/games/109983668079237/",
    isFlagship: true
  },
  { 
    title: "Brainrot Island", 
    visits: "695M+", 
    img: "https://i.ibb.co.com/99cj5QKB/brainrotisland.png",
    link: "https://www.roblox.com/games/4982363836/"
  },
  { 
    title: "Dead Sails", 
    visits: "40M+", 
    img: "https://i.ibb.co.com/7JD05kKg/deadails.png",
    link: "https://www.roblox.com/games/85832836496852/"
  }
];

const games = [...rawGames, ...rawGames, ...rawGames];

export const Projects: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const isJumping = useRef(false);

  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? 240 : 380; 
  const gap = isMobile ? 25 : 50; 
  const totalItemWidth = cardWidth + gap;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current || isJumping.current) return;
    const container = scrollRef.current;
    const currentScroll = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const singleSetWidth = rawGames.length * totalItemWidth;
    
    if (currentScroll < singleSetWidth * 0.5) {
      isJumping.current = true;
      container.scrollLeft = currentScroll + singleSetWidth;
      setTimeout(() => { isJumping.current = false; }, 50);
    } else if (currentScroll > singleSetWidth * 1.5 + (containerWidth / 2)) {
      isJumping.current = true;
      container.scrollLeft = currentScroll - singleSetWidth;
      setTimeout(() => { isJumping.current = false; }, 50);
    }

    const containerCenter = currentScroll + containerWidth / 2;
    const children = container.children[0].children;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < children.length; i++) {
      const childCenter = (children[i] as HTMLElement).offsetLeft + (children[i] as HTMLElement).offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setCenterIndex(closestIndex);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const targetIndex = rawGames.length; 
      el.scrollLeft = targetIndex * totalItemWidth - (el.offsetWidth / 2) + (cardWidth / 2);
      setTimeout(handleScroll, 100);
    }
  }, [totalItemWidth, windowWidth]);

  return (
    <section id="portfolio-detailed" className="py-32 px-0 bg-brand-black overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[1000px] bg-brand-primary/5 blur-[200px] pointer-events-none rounded-full"></div>

      <div className="max-w-full mx-auto relative">
        <div className="flex flex-col items-center text-center mb-16 space-y-4 px-6 reveal active">
          <h3 className="font-orbitron text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px]">Registry</h3>
          <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase tracking-tighter">
            System <span className="text-brand-primary">Showcase</span>
          </h2>
        </div>

        <div className="relative group/carousel">
          <div 
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar py-24 cursor-grab active:cursor-grabbing flex items-center scroll-smooth snap-x snap-mandatory"
            onScroll={handleScroll}
          >
            <div className="inline-flex gap-12 md:gap-12 px-[calc(50vw-120px)] md:px-[calc(50vw-190px)] items-center min-h-[500px] md:h-[650px]">
              {games.map((game, idx) => {
                const isActive = centerIndex === idx;
                const distance = Math.abs(idx - centerIndex);
                const scale = isActive ? 1.15 : distance === 1 ? 0.9 : 0.75;
                const opacity = isActive ? 1 : distance === 1 ? 0.6 : 0.2;

                return (
                  <div 
                    key={idx}
                    className="flex-shrink-0 flex flex-col items-center text-center transition-all duration-700 ease-out snap-center"
                    style={{ width: `${cardWidth}px`, transform: `scale(${scale})`, opacity: opacity, zIndex: isActive ? 50 : 10 }}
                  >
                    <div className={`relative w-full aspect-square rounded-[60px] overflow-hidden border-[4px] md:border-[6px] transition-all duration-700 
                      ${isActive ? 'border-brand-primary shadow-[0_0_100px_rgba(0,242,255,0.4)]' : 'border-white/5'}
                      bg-white/5 mb-10
                    `}>
                      <img src={game.img} alt={game.title} className="w-full h-full object-cover" />
                      {game.isFlagship && isActive && (
                        <div className="absolute top-8 right-8 animate-twinkle">
                          <div className="bg-brand-primary text-brand-black flex items-center gap-2 px-5 py-2 rounded-full shadow-2xl">
                            <Award size={14} />
                            <span className="font-orbitron text-[10px] font-black tracking-widest uppercase">FLAGSHIP</span>
                          </div>
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}></div>
                    </div>

                    <div className={`space-y-6 w-full px-6 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                      <h3 className="font-orbitron font-black text-white text-3xl tracking-tight uppercase">{game.title}</h3>
                      <div className="flex flex-col items-center gap-8">
                        <div className="inline-flex items-center px-8 py-3 bg-brand-primary/5 border border-brand-primary/20 rounded-full">
                          <span className="font-orbitron text-[13px] font-black tracking-widest uppercase">
                            <span className="text-brand-primary mr-2">{game.visits}</span>
                            <span className="text-white/40">VISITS</span>
                          </span>
                        </div>
                        <a href={game.link || "#"} target="_blank" className="group/btn px-12 py-4 bg-brand-primary text-brand-black font-orbitron text-[12px] font-black rounded-full transition-all hover:scale-105 active:scale-95 uppercase tracking-widest shadow-[0_10px_30px_rgba(0,242,255,0.2)]">
                          DEPLOY EXPERIENCE
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
