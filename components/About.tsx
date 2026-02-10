
import React from 'react';
import { LayoutGrid, Wand2, Film, MessageSquare, Twitter, Clock } from 'lucide-react';

const RobloxIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5.19 0L0 18.81L18.81 24L24 5.19L5.19 0ZM17.16 16.59L7.41 14.1L9.9 4.35L19.65 6.84L17.16 16.59Z" />
  </svg>
);

export const About: React.FC = () => {
  return (
    <section id="about" className="pt-32 pb-10 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal reveal-up text-center md:text-left">
          <h4 className="font-orbitron text-[#2B9FE6] font-bold tracking-[0.5em] uppercase text-[10px] mb-4">IDENTITY</h4>
          <h2 className="font-orbitron text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B9FE6] to-white">me</span></h2>
          <p className="font-inter text-white/40 max-w-2xl text-lg leading-relaxed border-l-2 border-[#2B9FE6]/30 pl-8 hidden md:block text-left">
            UI designer, animator, and VFX artist focused on clean interfaces, bold motion, and clear feedback for Roblox games.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-40 reveal reveal-up">
          <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-10 md:p-14 border-white/5">
            <h3 className="font-orbitron text-white/20 font-bold text-xs tracking-widest uppercase mb-12">Expertise</h3>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "UI Designer", desc: "Menus, HUDs, and progression systems.", icon: <LayoutGrid className="text-[#2B9FE6]" size={28} /> },
                { title: "Animator", desc: "Transitions, micro-interactions, and flow.", icon: <Film className="text-[#2B9FE6]" size={28} /> },
                { title: "Visual Effects", desc: "Impact, rewards, and cinematic moments.", icon: <Wand2 className="text-[#2B9FE6]" size={28} /> }
              ].map((item, i) => (
                <div key={i} className="group text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[#2B9FE6]/5 border border-[#2B9FE6]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                    {item.icon}
                  </div>
                  <h4 className="font-orbitron text-white font-black text-lg mb-2 uppercase">{item.title}</h4>
                  <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-[2.5rem] p-10 border-white/5">
            <h3 className="font-orbitron text-white/20 font-bold text-xs tracking-widest uppercase mb-10">Network Hub</h3>
            <div className="space-y-4">
              {[
                { label: "Roblox", v: "Profile", i: <RobloxIcon />, href: "https://www.roblox.com/users/5816342020/profile" },
                { label: "X", v: "@hg_D3v", i: <Twitter size={18} />, href: "https://x.com/hg_D3v" },
                { label: "Discord", v: "Invite", i: <MessageSquare size={18} />, href: "https://discord.gg/KyZyFPNqmn" },
                { label: "Status", v: "Available", i: <Clock size={18} />, href: "#" }
              ].map((info, i) => (
                <a key={i} href={info.href} target={info.href !== "#" ? "_blank" : "_self"} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#2B9FE6]/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="text-[#2B9FE6] opacity-50 group-hover:opacity-100">{info.i}</div>
                    <span className="font-orbitron text-white/60 font-bold text-[11px] group-hover:text-white">{info.label}</span>
                  </div>
                  <span className="font-orbitron text-[9px] font-black text-[#2B9FE6] tracking-widest uppercase opacity-60 group-hover:opacity-100">{info.v}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
