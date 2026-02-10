
import React from 'react';
import { Cpu, Globe, Code, Layers, Zap, Users } from 'lucide-react';

const stats = [
  { label: "NETWORK VISITS", value: "60B+", color: "text-brand-primary" },
  { label: "PEAK CCU", value: "1M+", color: "text-brand-secondary" },
  { label: "UGC SALES", value: "5M+", color: "text-white" },
];

const skills = [
  { name: "LUAU EXPERT", icon: <Code size={18} /> },
  { name: "ARCHITECTURE", icon: <Cpu size={18} /> },
  { name: "UI/UX DESIGN", icon: <Layers size={18} /> },
  { name: "OPTIMIZATION", icon: <Zap size={18} /> },
];

export const Nexus: React.FC = () => {
  return (
    <section id="nexus" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Core Stat */}
          <div className="lg:col-span-2 glass p-10 md:p-16 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] group-hover:bg-brand-primary/10 transition-all"></div>
            <h3 className="font-orbitron text-brand-primary font-bold text-[10px] tracking-[0.4em] mb-12 uppercase">Digital Infrastructure</h3>
            
            <div className="grid md:grid-cols-3 gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[10px] font-orbitron font-bold text-white/30 tracking-widest">{stat.label}</p>
                  <p className={`text-5xl md:text-7xl font-orbitron font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities Dock */}
          <div className="glass p-10 rounded-[2rem] flex flex-col justify-between">
            <h3 className="font-orbitron text-white/20 font-bold text-[10px] tracking-[0.4em] mb-8 uppercase">Tech Stack</h3>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-brand-primary/30 transition-all group">
                  <span className="font-orbitron text-[11px] font-bold text-white/50 group-hover:text-white">{skill.name}</span>
                  <div className="text-brand-primary opacity-30 group-hover:opacity-100">{skill.icon}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/5">
               <p className="text-[10px] text-white/30 leading-relaxed font-orbitron">FULL-STACK ROBLOX SOLUTIONS • SCALABLE BACKENDS • HIGH-FIDELITY INTERFACES</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
