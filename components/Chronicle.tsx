
import React from 'react';

const events = [
  { role: "PRODUCER", company: "STEAL A BRAINROT", time: "CURRENT", desc: "Orchestrating production and hyper-growth strategies." },
  { role: "AMBASSADOR", company: "ROBLOX DEVREL", time: "ONGOING", desc: "Leading the bridge between the company and the Brazilian dev community." },
  { role: "UGC CREATOR", company: "MARKETPLACE", time: "2020+", desc: "Dominated the virtual market with 5M+ individual product sales." },
  { role: "LEADER", company: "DEV COMMUNITY", time: "2019+", desc: "Managing 12k+ high-level developers globally." },
];

export const Chronicle: React.FC = () => {
  return (
    <section id="chronicle" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16 flex items-end justify-between">
        <div className="reveal active">
          <h3 className="font-orbitron text-brand-secondary font-bold text-[10px] tracking-[0.5em] mb-4">DEPLOYMENT LOGS</h3>
          <h2 className="font-orbitron text-4xl md:text-6xl font-black uppercase">Professional <span className="text-brand-secondary">Chronicle</span></h2>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-12 cursor-grab select-none">
        {events.map((event, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] md:w-[400px] glass p-10 rounded-[2.5rem] border-brand-secondary/10 hover:border-brand-secondary/40 transition-all">
            <span className="font-orbitron text-brand-secondary font-black text-[10px] tracking-widest">{event.time}</span>
            <h4 className="font-orbitron text-2xl font-black text-white mt-4 mb-2">{event.role}</h4>
            <p className="font-orbitron text-xs text-white/40 mb-8 tracking-wider">{event.company}</p>
            <p className="text-sm text-white/60 leading-relaxed font-light">{event.desc}</p>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};
