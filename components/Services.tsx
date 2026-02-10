
import React from 'react';
import { LayoutGrid, Wand2, Film, Activity } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 relative reveal reveal-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
             <h4 className="font-orbitron text-[#2B9FE6] font-bold tracking-[0.5em] uppercase text-[10px] mb-4">SERVICES</h4>
             <h3 className="font-orbitron text-white font-black text-4xl md:text-6xl uppercase tracking-tighter mb-6">Specialized for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B9FE6] to-white">game experiences</span></h3>
             <p className="font-inter text-white/40 text-base max-w-2xl leading-relaxed">
               I help teams deliver premium player feedback with clean UI structure, memorable motion, and cinematic effects.
             </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[ 
            { l: "UI Systems", d: "Menus, HUD, inventories and progression with a clear hierarchy.", i: <LayoutGrid size={24} /> }, 
            { l: "Motion", d: "Transitions and micro-interactions with live feedback.", i: <Activity size={24} /> }, 
            { l: "VFX", d: "Cinematic impacts and FX for retention.", i: <Wand2 size={24} /> }, 
            { l: "Animation", d: "Smooth, engaging animations.", i: <Film size={24} /> } 
          ].map((service, i) => (
            <div key={i} className="group relative transition-all duration-500 hover:scale-105 h-full">
              <div className="glass-card p-10 rounded-[2.5rem] h-full flex flex-col items-center text-center border-white/5 hover:border-[#2B9FE6]/50 shadow-2xl overflow-hidden">
                <div className="w-20 h-20 mb-8 relative flex items-center justify-center flex-shrink-0">
                   <div className="absolute inset-0 bg-[#2B9FE6]/10 border border-[#2B9FE6]/30 transition-all duration-700 group-hover:rotate-[120deg]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                   <div className="relative text-[#2B9FE6] group-hover:scale-125 transition-transform duration-500">{service.i}</div>
                </div>
                <h4 className="font-orbitron text-xl font-black text-white mb-4 tracking-tight group-hover:text-[#2B9FE6] transition-colors uppercase">{service.l}</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed">{service.d}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#2B9FE6] group-hover:w-1/2 transition-all duration-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
