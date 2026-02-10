
import React from 'react';
import { LayoutGrid, Wand2, Film, Cpu } from 'lucide-react';

const skills = [
  {
    name: "UI Designer",
    sub: "Design & Import",
    desc: "HUD Systems, Menus, Inventory & Mobile Optimization.",
    level: "LVL 01",
    icon: <LayoutGrid size={24} />
  },
  {
    name: "Visual Effects",
    sub: "Custom Particles",
    desc: "Post-Processing, VFX Textures, Particle Emitters & UI FX.",
    level: "LVL 02",
    icon: <Wand2 size={24} />
  },
  {
    name: "Animation",
    sub: "Blender & Roblox",
    desc: "UI Transitions, Character Anim & Cinematic Cuts.",
    level: "LVL 03",
    icon: <Film size={24} />
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 relative reveal reveal-right">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-end mb-16 space-y-4 text-center md:text-right">
          <div className="px-4 py-1.5 rounded-lg border border-[#2B9FE6]/30 bg-[#2B9FE6]/5 flex items-center gap-2">
             <Cpu size={14} className="text-[#2B9FE6]" />
             <span className="font-orbitron text-[10px] font-black text-[#2B9FE6] tracking-[0.3em] uppercase">Tech Stack</span>
          </div>
          <h2 className="font-orbitron text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">My Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="group glass-card p-12 rounded-[2.5rem] border-white/5 hover:border-[#2B9FE6]/30 transition-all duration-700 shadow-2xl relative overflow-hidden text-left"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#2B9FE6] group-hover:border-[#2B9FE6]/30 group-hover:bg-[#2B9FE6]/5 transition-all duration-500">
                  {skill.icon}
                </div>
                <span className="font-orbitron text-[9px] font-bold text-white/20 tracking-[0.2em] group-hover:text-white/40 transition-colors uppercase pt-2">{skill.level}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-orbitron text-2xl font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">{skill.name}</h3>
                <p className="font-orbitron text-[10px] font-black text-[#2B9FE6] uppercase tracking-[0.2em]">{skill.sub}</p>
                <div className="w-10 h-0.5 bg-white/10 group-hover:w-16 group-hover:bg-[#2B9FE6]/50 transition-all duration-500"></div>
                <p className="font-inter text-xs text-white/30 font-medium leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                  {skill.desc}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B9FE6]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
