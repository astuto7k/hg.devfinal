
import React from 'react';
import { BarChart3, Users, Star, Trophy } from 'lucide-react';

export const Stats: React.FC = () => {
  return (
    <section id="statistics" className="py-24 px-6 relative overflow-hidden reveal reveal-left">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start mb-12 space-y-4 text-left">
          <div className="px-4 py-1.5 rounded-lg border border-[#2B9FE6]/30 bg-[#2B9FE6]/5 flex items-center gap-2">
             <BarChart3 size={14} className="text-[#2B9FE6]" />
             <span className="font-orbitron text-[10px] font-black text-[#2B9FE6] tracking-[0.3em] uppercase">Live Metrics</span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">Statistics</h2>
        </div>

        <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 shadow-2xl">
          <div className="p-16 flex flex-col items-center text-center group transition-all duration-700 hover:bg-white/[0.02]">
            <div className="mb-10 text-white/10 group-hover:text-[#2B9FE6]/40 transition-colors duration-500">
              <Users size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-orbitron text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-700">100%</h3>
            <div className="space-y-1">
              <p className="font-orbitron text-[11px] font-black text-white/90 uppercase tracking-[0.2em]">Satisfied</p>
              <p className="font-orbitron text-[9px] font-bold text-[#2B9FE6] uppercase tracking-[0.3em] opacity-40">Happy Partners</p>
            </div>
          </div>
          
          <div className="p-16 flex flex-col items-center text-center group transition-all duration-700 hover:bg-white/[0.02]">
            <div className="mb-10 text-white/10 group-hover:text-[#2B9FE6]/40 transition-colors duration-500">
              <Star size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-orbitron text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-700">50B+</h3>
            <div className="space-y-1">
              <p className="font-orbitron text-[11px] font-black text-white/90 uppercase tracking-[0.2em]">Contributions</p>
              <p className="font-orbitron text-[9px] font-bold text-[#2B9FE6] uppercase tracking-[0.3em] opacity-40">Player Impact</p>
            </div>
          </div>

          <div className="p-16 flex flex-col items-center text-center group transition-all duration-700 hover:bg-white/[0.02]">
            <div className="mb-10 text-white/10 group-hover:text-[#2B9FE6]/40 transition-colors duration-500">
              <Trophy size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-orbitron text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-700">+25</h3>
            <div className="space-y-1">
              <p className="font-orbitron text-[11px] font-black text-white/90 uppercase tracking-[0.2em]">Games</p>
              <p className="font-orbitron text-[9px] font-bold text-[#2B9FE6] uppercase tracking-[0.3em] opacity-40">Shipped Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
