
import React from 'react';
import { Youtube } from 'lucide-react';
import { formatCompact, useTotalVisits } from '../lib/stats';
import { formatPlayers, useLivePlayers } from '../lib/livePlayers';
import { LiveDot } from './LiveDot';
import { DiscordIcon } from './DiscordIcon';
import { RobloxIcon } from './RobloxIcon';
import { DISCORD_CONTACT_ID, focusDiscordContact } from '../lib/contact';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Hero: React.FC = () => {
  const totalVisits = useTotalVisits();
  const livePlayers = useLivePlayers();

  return (
    <section id="hero" className="relative flex items-center justify-center px-6 pt-24 md:pt-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="flex justify-center order-1 lg:order-1 reveal active">
            <div className="relative group">
              <div className="w-64 h-64 md:w-[480px] md:h-[480px] rounded-full p-1.5 border border-brand-primary/10 shadow-[0_0_120px_rgba(43,159,230,0.12)] relative transition-all duration-700">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/5 transition-all duration-700 bg-white/5">
                  <img
                    src="./hg.png"
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

          <div className="space-y-10 order-2 lg:order-2 reveal active text-left pt-4 md:pt-8 lg:pt-0">
            <div className="space-y-6">
              <div className="inline-block">
                <h4 className="font-orbitron text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">PORTFOLIO</h4>
              </div>
              <h1 className="font-orbitron text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">
                Hg.dev
              </h1>
              <h2 className="font-inter text-xl md:text-2xl font-bold text-brand-primary/90 leading-tight">
                Animator & 3D Modeler
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#portfolio" className="px-9 py-4 bg-brand-primary text-brand-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(0,242,255,0.45)] transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-widest font-orbitron text-center inline-block">
                View projects
              </a>
              <a href={`#${DISCORD_CONTACT_ID}`} onClick={focusDiscordContact} className="px-9 py-4 glass-card text-white font-bold rounded-full hover:border-white/20 transition-all text-sm uppercase tracking-widest font-orbitron text-center inline-block">
                Contact
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6">
              <div className="glass-card p-7 rounded-2xl border-white/5 group">
                <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors">+5</h3>
                <p className="text-white font-bold text-xs mt-1">Front Pages</p>
                <p className="text-white/30 text-[10px] leading-tight mt-2 font-medium uppercase tracking-wider [text-wrap:balance]">Roblox and Fortnite Home</p>
              </div>
              <div className="glass-card p-7 rounded-2xl border-l-4 border-l-brand-primary/40 border-white/5 group">
                <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors">+25 Games</h3>
                <p className="text-white/30 text-[10px] leading-tight mt-4 font-medium uppercase tracking-wider">UI and Animator stack</p>
              </div>
              <div className="glass-card p-7 rounded-2xl border-white/5 group">
                <h3 className="text-3xl font-black text-white group-hover:text-brand-primary transition-colors">+{formatCompact(totalVisits)}</h3>
                <p className="text-white font-bold text-xs mt-1">Contributions</p>
                {livePlayers.hasData ? (
                  <p className="flex items-start gap-2 text-white/30 text-[10px] leading-tight mt-2 font-medium uppercase tracking-wider" aria-live="polite">
                    <span className="mt-[1px]"><LiveDot /></span>
                    <span><span className="text-emerald-400">{formatPlayers(livePlayers.total)}</span> players online now</span>
                  </p>
                ) : (
                  <p className="text-white/30 text-[10px] leading-tight mt-2 font-medium uppercase tracking-wider">Global impact</p>
                )}
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
