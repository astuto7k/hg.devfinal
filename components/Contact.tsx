
import React from 'react';
import { Youtube } from 'lucide-react';

const RobloxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M5.19 0L0 18.81L18.81 24L24 5.19L5.19 0ZM17.16 16.59L7.41 14.1L9.9 4.35L19.65 6.84L17.16 16.59Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.37.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const Contact: React.FC = () => {
  const socialCards = [
    { 
      name: "X", 
      desc: "Updates and previews.", 
      icon: <XIcon />, 
      href: "https://x.com/hg_D3v" 
    },
    { 
      name: "Roblox", 
      desc: "Profile and games.", 
      icon: <RobloxIcon />, 
      href: "https://www.roblox.com/users/5816342020/profile" 
    },
    { 
      name: "YouTube", 
      desc: "Clips and breakdowns.", 
      icon: <Youtube size={24} />, 
      href: "https://www.youtube.com/@HgD3v" 
    },
    { 
      name: "Discord", 
      desc: "Let's talk about projects.", 
      icon: <DiscordIcon />, 
      href: "https://discord.gg/KyZyFPNqmn" 
    },
  ];

  return (
    <section id="contact" className="pt-10 pb-40 px-6 relative overflow-hidden">
      {/* Glow background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[800px] bg-[#2B9FE6]/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 reveal">
          <h4 className="font-orbitron text-[#2B9FE6] font-bold tracking-[0.5em] uppercase text-[12px] mb-6">CONTACT</h4>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Let's build something <span className="text-[#2B9FE6]">bold</span>
          </h2>
          <p className="font-inter text-white/40 max-w-xl text-lg leading-relaxed">
            Reach out for collaborations, UI pipelines, or motion work. I respond fast on Discord and X.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {socialCards.map((card, i) => (
            <a 
              key={i} 
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-[#2B9FE6]/40 transition-all duration-500 shadow-2xl flex flex-col items-start min-h-[260px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#2B9FE6]/10 flex items-center justify-center text-[#2B9FE6] mb-12 shadow-[0_0_30px_rgba(43,159,230,0.2)] group-hover:scale-110 transition-all duration-500">
                {card.icon}
              </div>
              <h4 className="font-orbitron text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-[#2B9FE6] transition-colors">
                {card.name}
              </h4>
              <p className="font-inter text-white/30 text-sm font-medium leading-relaxed">
                {card.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
