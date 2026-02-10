
import React from 'react';
import { ExternalLink } from 'lucide-react';

const press = [
  { outlet: "G1 GLOBO", title: "Roblox attracts new talents" },
  { outlet: "MEDIUM", title: "Spotlight on HGDev" },
  { outlet: "CNN BRASIL", title: "The games market in 2024" },
  { outlet: "SBT NEWS", title: "Elite developers" },
];

export const Media: React.FC = () => {
  return (
    <section className="py-16 bg-white/5 border-y border-white/5 relative z-10">
      <div className="flex animate-marquee whitespace-nowrap overflow-hidden items-center">
        {[...press, ...press, ...press].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-12 mx-12">
            <span className="font-orbitron text-[10px] font-black text-brand-primary tracking-[0.5em] uppercase">{item.outlet}</span>
            <span className="font-orbitron text-xl md:text-2xl font-black text-white/20 uppercase hover:text-white/60 transition-colors cursor-pointer flex items-center gap-4">
              {item.title} <ExternalLink size={14} className="opacity-30" />
            </span>
            <div className="w-2 h-2 rounded-full bg-brand-primary/20"></div>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
};
