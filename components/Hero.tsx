
import React, { useEffect, useState } from 'react';
import { Youtube } from 'lucide-react';

const wordsList = [
  "UI", "VFX", "MOTION", "HG", "DESIGN", "ANIMATION",
  "FX", "INTERFACE", "ROBLOX", "VISUAL", "BRANDING", "CINEMATIC",
  "UX", "SHADER", "HYPE"
];

const RobloxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5.19 0L0 18.81L18.81 24L24 5.19L5.19 0ZM17.16 16.59L7.41 14.1L9.9 4.35L19.65 6.84L17.16 16.59Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.37.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const Hero: React.FC = () => {
  const [elements, setElements] = useState<{ type: 'word', x: number, y: number, size: number, opacity: number, text: string, delay: number }[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements = [];
      const wordTarget = 35; 
      const rows = 8;
      const cols = 10;
      const cells: { r: number, c: number }[] = [];
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ r, c });
        }
      }

      const shuffledCells = cells.sort(() => Math.random() - 0.5);

      let placedWords = 0;
      for (const cell of shuffledCells) {
        if (placedWords >= wordTarget) break;

        const isRightSide = cell.c >= cols / 2;
        const randomChance = Math.random();
        
        if (isRightSide || randomChance < 0.25) {
          const posX = (cell.c / cols) * 100 + (Math.random() * (100 / cols) * 0.6);
          const posY = (cell.r / rows) * 100 + (Math.random() * (100 / rows) * 0.6);

          newElements.push({
            type: 'word' as const,
            text: wordsList[placedWords % wordsList.length],
            x: posX,
            y: posY,
            size: 8 + Math.random() * 10,
            opacity: 0.07 + Math.random() * 0.08,
            delay: Math.random() * 5
          });
          placedWords++;
        }
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {elements.map((el, i) => (
          <div
            key={`word-${i}`}
            className="absolute font-orbitron font-bold whitespace-nowrap animate-float"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.size}px`,
              opacity: el.opacity,
              animationDelay: `${el.delay}s`,
              letterSpacing: '0.15em',
              color: '#2B9FE6' 
            }}
          >
            {el.text}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex justify-center lg:justify-start order-1 lg:order-1 reveal active">
            <div className="relative group">
              <div className="w-64 h-64 md:w-[480px] md:h-[480px] rounded-full p-1.5 border border-brand-primary/10 shadow-[0_0_120px_rgba(43,159,230,0.12)] relative transition-all duration-700">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/5 transition-all duration-700 bg-white/5">
                  <img
                    src="https://i.ibb.co.com/FkZhW6j4/hg.png"
                    alt="Hg.dev Blue Logo Avatar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="absolute top-[8%] right-[2%] bg-white text-brand-primary font-bold text-[9px] md:text-[11px] px-4 py-1.5 rounded-full shadow-2xl border border-brand-primary/5 z-20 animate-bounce">
                  Available for projects
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 order-2 lg:order-2 reveal active text-left">
            <div className="space-y-6">
              <div className="inline-block">
                <h4 className="font-orbitron text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">PORTFOLIO</h4>
              </div>
              <h1 className="font-orbitron text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">
                Hg.dev
              </h1>
              <h2 className="font-inter text-xl md:text-2xl font-bold text-brand-primary/90 leading-tight">
                UI Designer, Animator & Visual Effects Artist
              </h2>
              <p className="font-inter text-white/50 text-sm md:text-base max-w-lg leading-relaxed">
                I craft immersive UI systems, expressive motion, and visual effects for Roblox games. 
                My focus is clarity, energy, and polish that keeps players engaged.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#portfolio" className="px-9 py-4 bg-brand-primary text-brand-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(0,242,255,0.45)] transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-widest font-orbitron text-center inline-block">
                View projects
              </a>
              <a href="https://discord.gg/KyZyFPNqmn" target="_blank" rel="noopener noreferrer" className="px-9 py-4 glass-card text-white font-bold rounded-full hover:border-white/20 transition-all text-sm uppercase tracking-widest font-orbitron text-center inline-block">
                Contact
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6">
              <div className="glass-card p-7 rounded-2xl border-white/5 group">
                <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors">100%</h3>
                <p className="text-white font-bold text-xs mt-1">Satisfied</p>
                <p className="text-white/30 text-[10px] leading-tight mt-2 font-medium uppercase tracking-wider">Trusted by teams</p>
              </div>
              <div className="glass-card p-7 rounded-2xl border-l-4 border-l-brand-primary/40 border-white/5 group">
                <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors">+25 Games</h3>
                <p className="text-white/30 text-[10px] leading-tight mt-4 font-medium uppercase tracking-wider">UI and VFX stack</p>
              </div>
              <div className="glass-card p-7 rounded-2xl border-white/5 group">
                <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors">+50B</h3>
                <p className="text-white font-bold text-xs mt-1">Contributions</p>
                <p className="text-white/30 text-[10px] leading-tight mt-2 font-medium uppercase tracking-wider">Global impact</p>
              </div>
            </div>

            <div className="pt-8 flex flex-col gap-5">
              <p className="font-orbitron text-[9px] text-white/20 font-bold tracking-[0.4em] uppercase">FOLLOW | CONTACT ME:</p>
              <div className="flex gap-4">
                {[
                  { icon: <XIcon />, href: "https://x.com/hg_D3v" },
                  { icon: <RobloxIcon />, href: "https://www.roblox.com/users/5816342020/profile" },
                  { icon: <Youtube size={20} />, href: "https://www.youtube.com/@HgD3v" },
                  { icon: <DiscordIcon />, href: "https://discord.gg/KyZyFPNqmn" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-black/40 backdrop-blur-md border border-white/10 text-white/40 hover:text-brand-primary hover:border-brand-primary/40 transition-all hover:scale-110 shadow-lg"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
