
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft, ExternalLink, X } from 'lucide-react';
import { principalGames } from '../data/games.js';
import { formatPlayers, playersKey, useLivePlayers } from '../lib/livePlayers';
import { LiveDot } from './LiveDot';

const PlatformBadge = ({ platform }: { platform: string }) => (
  <div className="px-3 py-1 rounded-full bg-[#2B9FE6]/10 border border-[#2B9FE6]/20 flex items-center gap-2">
    <span className="font-orbitron text-[8px] font-black text-[#2B9FE6] tracking-widest uppercase">{platform}</span>
  </div>
);

type Game = (typeof principalGames)[number];

// Velocidade do carrossel de jogos: depende dos jogadores do card no centro da tela.
// Jogos com 0 jogadores passam a MARQUEE_MAX_SPEED; o mais popular, perto de MARQUEE_MIN_SPEED.
const MARQUEE_MAX_SPEED = 120; // px/s
const MARQUEE_MIN_SPEED = 30; // px/s
const MARQUEE_EASING_S = 0.8; // suavização da troca de velocidade
const MARQUEE_START_HOLD_MS = 1000; // pausa ao entrar na tela, com o início da lista à esquerda
const MARQUEE_START_RAMP_S = 1.5; // aceleração a partir do zero depois da pausa

const marqueeSpeed = (players: number, maxPlayers: number) => {
  if (maxPlayers <= 0) return MARQUEE_MAX_SPEED;
  const k = (MARQUEE_MAX_SPEED / MARQUEE_MIN_SPEED - 1) / Math.log10(1 + maxPlayers);
  return MARQUEE_MAX_SPEED / (1 + k * Math.log10(1 + Math.max(0, players)));
};

type MarqueeItem = { game: Game; players: number | undefined };

const GamesMarquee = ({ items }: { items: MarqueeItem[] }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // A ordem exibida só muda com a faixa fora da tela, para nunca trocar o card visível de forma brusca.
  // A velocidade usa sempre os números mais recentes.
  const latestOrder = items.map((item) => item.game.title);
  const latestOrderRef = useRef(latestOrder);
  latestOrderRef.current = latestOrder;
  const inViewRef = useRef(false);
  const [order, setOrder] = useState(latestOrder);
  const latestKey = latestOrder.join('|');
  useEffect(() => {
    if (!inViewRef.current) setOrder(latestOrderRef.current);
  }, [latestKey]);

  const byTitle = new Map(items.map((item) => [item.game.title, item]));
  const games = order.map((title) => byTitle.get(title)).filter((item): item is MarqueeItem => !!item);
  const playersRef = useRef<(number | undefined)[]>([]);
  playersRef.current = games.map((item) => item.players);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let last = 0;
    let offset = 0;
    let speed = 0;
    let holdUntil = 0;
    let rampStart = 0;

    const render = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    // Volta ao início da lista: o 1º card (o jogo com mais jogadores) encostado à esquerda, seguido pelos próximos.
    const resetToStart = () => {
      offset = 0;
      speed = 0;
      render();
    };

    const step = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      const half = track.scrollWidth / 2;
      const card = track.firstElementChild as HTMLElement | null;
      const list = playersRef.current;
      if (now >= holdUntil && half > 0 && card && list.length) {
        if (!rampStart) rampStart = now;
        const center = (offset + viewport.clientWidth / 2) % half;
        const index = Math.floor(center / card.offsetWidth) % list.length;
        const maxPlayers = Math.max(0, ...list.map((p) => p ?? 0));
        // Depois da pausa, a velocidade-alvo sobe de 0 até a normal com easing (sem tranco).
        const ramp = Math.min((now - rampStart) / 1000 / MARQUEE_START_RAMP_S, 1);
        const eased = ramp * ramp * (3 - 2 * ramp);
        const target = marqueeSpeed(list[index] ?? 0, maxPlayers) * eased;
        speed += (target - speed) * (1 - Math.exp(-dt / MARQUEE_EASING_S));
        offset = (offset + speed * dt) % half;
        render();
      }
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    // Só anima com a faixa na tela e a aba visível; com movimento reduzido não anima (lista rola manualmente).
    const sync = () => {
      if (reduceMotion.matches) track.style.transform = '';
      if (document.hidden || reduceMotion.matches || !inViewRef.current) stop();
      else start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (visible === inViewRef.current) return;
        inViewRef.current = visible;
        if (visible) {
          // Entrou na tela: início da lista alinhado à esquerda, parado por 1s, depois acelera do zero.
          if (!reduceMotion.matches) resetToStart();
          holdUntil = performance.now() + MARQUEE_START_HOLD_MS;
          rampStart = 0;
        } else {
          // Saiu da tela: aplica a ordem mais recente para a próxima entrada.
          setOrder(latestOrderRef.current);
        }
        sync();
      },
      { threshold: [0, 0.5] }
    );

    observer.observe(viewport);
    document.addEventListener('visibilitychange', sync);
    reduceMotion.addEventListener('change', sync);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduceMotion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div ref={viewportRef} className="games-marquee-viewport relative w-full overflow-hidden py-10">
      <div ref={trackRef} className="games-marquee-track flex w-max whitespace-nowrap">
        {[...games, ...games].map(({ game }, i) => {
          const isCopy = i >= games.length;
          return (
            <div key={`${game.title}-${isCopy ? 'copy' : 'main'}`} className={`flex-shrink-0 px-4 w-[340px] text-left${isCopy ? ' games-marquee-copy' : ''}`} aria-hidden={isCopy || undefined}>
              <div className="group glass-card rounded-[2rem] overflow-hidden border-white/5 hover:border-[#2B9FE6]/40 transition-all duration-500 shadow-2xl flex flex-col h-[380px]">
                <div className="h-44 overflow-hidden relative flex-shrink-0 bg-white/5">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4"><PlatformBadge platform={game.platform} /></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-orbitron text-base font-black text-white uppercase mb-2">{game.title}</h4>
                  <p className="font-inter text-[10px] text-white/20 uppercase tracking-[0.2em] mb-4">{game.type}</p>
                  <a href={game.url || "#"} target="_blank" className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-orbitron text-[9px] font-black text-[#2B9FE6] uppercase tracking-[0.2em] hover:bg-[#2B9FE6] hover:text-brand-black transition-all flex items-center justify-center gap-2 mt-auto">
                    {game.btn} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Project {
  title: string;
  type: string;
  platform: string;
  img: string;
  images?: string[];
  desc?: string;
  videoUrl?: string;
}

export const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const myWork: Project[] = [
    {
      title: "Steal a Brainrot",
      type: "UI/UX",
      platform: "Roblox",
      img: "https://i.ibb.co.com/CsBSp1v8/Steala-Brainrot1.png",
      images: [
        "https://i.ibb.co.com/CsBSp1v8/Steala-Brainrot1.png",
        "https://i.ibb.co.com/KpQNJTCv/Steala-Brainrot4.png",
        "https://i.ibb.co.com/fsbFtGC/Steala-Brainrot5.png",
        "https://i.ibb.co.com/HpGbS69q/Steala-Brainrot2.png",
        "https://i.ibb.co.com/7J2rj7zd/Steala-Brainrot3.png"
      ],
      desc: "Complete interface (HUD and Menus) focused on player retention and visual clarity. I implemented dynamic inventory systems and high-impact purchase feedback."
    },
    {
      title: "Dead Sky",
      type: "UI/UX",
      platform: "Roblox",
      img: "https://i.ibb.co.com/dwvPZ0WS/Explorer-Game1.png",
      images: [
        "https://i.ibb.co.com/dwvPZ0WS/Explorer-Game1.png",
        "https://i.ibb.co.com/bjMM8sQj/Explorer-Game2.png",
        "https://i.ibb.co.com/4ng9NkZB/Explorer-Game3.png",
        "https://i.ibb.co.com/GQKgZc75/Explorer-Game4.png",
        "https://i.ibb.co.com/60PDcGcm/Explorer-Game5.png",
        "https://i.ibb.co.com/x8JHHKMR/Explorer-Game6.png"
      ],
      desc: "Immersive visual atmosphere and interface systems for an atmospheric exploration and survival game."
    },
    {
      title: "Brainrot Island",
      type: "VFX",
      platform: "Roblox",
      img: "https://i.ibb.co.com/yDL64XG/PVEGAME1.png",
      images: [
        "https://i.ibb.co.com/yDL64XG/PVEGAME1.png",
        "https://i.ibb.co.com/6RTNkqnW/PVEGAME2.png",
        "https://i.ibb.co.com/jPjxycCP/PVEGAME3.png",
        "https://i.ibb.co.com/1GMrQrMh/PVEGAME4.png",
        "https://i.ibb.co.com/WWp3wW1C/PVEGAME5.png",
        "https://i.ibb.co.com/Z6JPj9Mt/PVEGAME6.png"
      ],
      desc: "Expert creation of environment and combat visual effects, designed to elevate immersion and provide satisfying visual feedback."
    },
    {
      title: "Anime Royale",
      type: "UI/UX",
      platform: "Roblox",
      img: "https://i.ibb.co.com/xqBm6cM5/Anime-Game3.png",
      images: [
        "https://i.ibb.co.com/xqBm6cM5/Anime-Game3.png",
        "https://i.ibb.co.com/k2VxWqqV/Anime-Game4.png",
        "https://i.ibb.co.com/cSw2MJ8r/Anime-Game5.png",
        "https://i.ibb.co.com/Z1HCvrc1/Anime-Game6.png"
      ],
      desc: "Stylized layout inspired by modern anime trends, featuring fast, responsive animations and polished transitions."
    },
    {
      title: "100vs1 Gorilla",
      type: "Animation",
      platform: "Roblox",
      img: "https://i.ibb.co.com/QF5z3SMq/Special-Comissions1.png",
      images: [
        "https://i.ibb.co.com/QF5z3SMq/Special-Comissions1.png",
        "https://i.ibb.co.com/nNNKMj7J/Special-Comissions2.png",
        "https://i.ibb.co.com/4w88LXLr/Special-Comissions3.png",
        "https://i.ibb.co.com/zhSd22xP/Special-Comissions4.png",
        "https://i.ibb.co.com/qFcNgGg0/Special-Comissions5.png"
      ],
      desc: "Dynamic character animations and advanced rigging solutions for intense, large-scale combat experiences."
    },
  ];

  const animationGifs = [
    { cima: "./brainrots/lixeira-giro.mp4", baixo: "./brainrots/lixeira-baixo.mp4" },
    { cima: "./brainrots/caracol-baixo.mp4", baixo: "./brainrots/caracol-cima.mp4" },
    { cima: "./brainrots/esqueleto-cima.mp4", baixo: "./brainrots/esqueleto-baixo.mp4" },
    { cima: "./brainrots/castor-cima.mp4", baixo: "./brainrots/castor-baixo.mp4" },
    { cima: "./brainrots/torradeira-cima.mp4", baixo: "./brainrots/torradeira-baixo.mp4" },
    { cima: "./brainrots/crocodilo-cima.mp4", baixo: "./brainrots/crocodilo-baixo.mp4" },
    { cima: "./brainrots/patorobo-baixo.mp4", baixo: "./brainrots/patorobo-cima.mp4" },
    { cima: "./brainrots/tigre-cima.mp4", baixo: "./brainrots/tigre-baixo.mp4" },
    { cima: "./brainrots/ceifador-cima.mp4", baixo: "./brainrots/ceifador-baixo.mp4" },
    { cima: "./brainrots/bruxa-baixo.mp4", baixo: "./brainrots/bruxa-cima.mp4" },
    { cima: "./brainrots/2026-02-08_01-50-21.mp4", baixo: "./brainrots/2026-02-08_01-48-29.mp4" },
    { cima: "./brainrots/abacaxi-cima.mp4", baixo: "./brainrots/abacaxi-baixo.mp4" },
    { cima: "./brainrots/girassol-baixo.mp4", baixo: "./brainrots/girassol-cima.mp4" },
    { cima: "./brainrots/2026-02-08_01-25-54.mp4", baixo: "./brainrots/2026-02-08_01-23-48.mp4" },
    { cima: "./brainrots/maca-baixo.mp4", baixo: "./brainrots/maca-cima.mp4" },
    { cima: "./brainrots/fliperama-cima.mp4", baixo: "./brainrots/fliperama-baixo.mp4" },
    { cima: "./brainrots/2026-04-11_01-52-06.mp4", baixo: "./brainrots/2026-04-11_01-51-44.mp4" },
    { cima: "./brainrots/2026-04-11_19-52-04.mp4", baixo: "./brainrots/2026-04-11_19-57-43.mp4" }
  ];

  const livePlayers = useLivePlayers();
  // Do jogo com mais jogadores para o com menos; sem dado vão para o fim, na ordem original.
  const sortedGames = useMemo(() => {
    const withPlayers = principalGames.map((game, index) => {
      const key = playersKey(game);
      return { game, index, players: key ? livePlayers.players[key] : undefined };
    });
    withPlayers.sort((a, b) => {
      if (a.players === undefined || b.players === undefined) {
        if (a.players === b.players) return a.index - b.index;
        return a.players === undefined ? 1 : -1;
      }
      return b.players - a.players || a.index - b.index;
    });
    return withPlayers;
  }, [livePlayers]);

  const nextWork = () => setWorkIndex((prev) => (prev + 1) % (isMobile ? myWork.length : myWork.length - 2));
  const prevWork = () => setWorkIndex((prev) => (prev - 1 + (isMobile ? myWork.length : myWork.length - 2)) % (isMobile ? myWork.length : myWork.length - 2));

  const nextAnim = () => setAnimIndex((prev) => (prev + 3) % animationGifs.length);
  const prevAnim = () => setAnimIndex((prev) => (prev - 3 + animationGifs.length) % animationGifs.length);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setActiveImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const projectImages = selectedProject?.images || (selectedProject ? [selectedProject.img] : []);

  return (
    <>
      {/* Project Details Modal - FIXED TO VIEWPORT ROOT TO PREVENT TRANSFORM BUGS */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
          {/* Enhanced Backdrop */}
          <div
            className="absolute inset-0 bg-brand-black/95 backdrop-blur-2xl transition-opacity duration-500"
            onClick={() => setSelectedProject(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] glass-card rounded-[3rem] border-white/5 overflow-hidden shadow-[0_0_150px_rgba(43,159,230,0.2)] flex flex-col lg:flex-row animate-in fade-in zoom-in duration-500 z-[1010]">

            {/* Close Button - Always visible and centered in its area */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#2B9FE6] hover:border-[#2B9FE6] transition-all z-[1020] shadow-2xl group"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Left Side: Dynamic Gallery (65% width) */}
            <div className="w-full lg:w-[65%] flex flex-col bg-black/40 border-b lg:border-b-0 lg:border-r border-white/5 h-full overflow-hidden relative">
              {/* Main Viewport */}
              <div className="flex-grow relative flex items-center justify-center overflow-hidden p-8 md:p-12 group">
                <img
                  src={projectImages[activeImageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-700"
                />

                {/* Navigation Arrows */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev - 1 + projectImages.length) % projectImages.length)}
                      className="absolute left-6 w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-[#2B9FE6] hover:border-[#2B9FE6]/50 opacity-0 group-hover:opacity-100 transition-all shadow-2xl"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev + 1) % projectImages.length)}
                      className="absolute right-6 w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-[#2B9FE6] hover:border-[#2B9FE6]/50 opacity-0 group-hover:opacity-100 transition-all shadow-2xl"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}

                <div className="absolute top-10 left-10"><PlatformBadge platform={selectedProject.platform} /></div>
              </div>

              {/* Horizontal Thumbnails Row */}
              {projectImages.length > 0 && (
                <div className="h-32 bg-white/[0.02] border-t border-white/5 p-4 flex items-center justify-center gap-4 overflow-hidden">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-6">
                    {projectImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`flex-shrink-0 w-28 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === i ? 'border-[#2B9FE6] scale-105 shadow-[0_0_20px_rgba(43,159,230,0.3)]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`thumb ${i}`} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Information Panel (35% width) */}
            <div className="w-full lg:w-[35%] p-10 md:p-14 flex flex-col justify-between bg-brand-black/98 text-left relative overflow-y-auto custom-scrollbar border-l border-white/5">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-[2px] bg-[#2B9FE6]"></span>
                    <h4 className="font-orbitron text-[#2B9FE6] font-bold text-[10px] tracking-[0.5em] uppercase">{selectedProject.type}</h4>
                  </div>
                  <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">{selectedProject.title}</h2>

                  <div className="space-y-6 pt-4">
                    <p className="font-inter text-white/50 text-base leading-relaxed">
                      {selectedProject.desc || "Full custom design, created and imported by me to ensure the highest quality player experience and maximum performance for modern gaming environments."}
                    </p>

                    {/* Meta Section */}
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div>
                        <p className="font-orbitron text-[9px] text-white/20 font-bold uppercase tracking-widest mb-1">Impact</p>
                        <p className="font-inter text-sm text-white/80 font-semibold">High Retention</p>
                      </div>
                      <div>
                        <p className="font-orbitron text-[9px] text-white/20 font-bold uppercase tracking-widest mb-1">Source</p>
                        <p className="font-inter text-sm text-white/80 font-semibold">Verified HG.dev</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-16 flex flex-col gap-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-5 bg-white/5 border border-white/10 text-white/40 font-orbitron font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  CLOSE VIEWER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Portfolio Layout */}
      <div id="portfolio" className="relative reveal reveal-up pt-[72px] md:pt-24 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-left">
            <div>
              <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">My <span className="text-[#2B9FE6]">Work</span></h2>
              <p className="font-inter text-white/40 text-base max-w-xl">Models and Animation created in Blender for Fortnite and Roblox.</p>
            </div>
          </div>

          {/* ANIMATION subsection - first */}
          <div className="mb-[72px] md:mb-24 reveal reveal-up">
            <div className="flex flex-wrap items-center justify-between gap-y-6 mb-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[2px] bg-[#2B9FE6]"></span>
                <h3 className="font-orbitron text-[#2B9FE6] font-bold text-xl tracking-[0.4em] uppercase">Animated Models</h3>
              </div>
              <div className="flex gap-4 ml-auto">
                <button onClick={prevAnim} className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#2B9FE6] hover:text-brand-black transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextAnim} className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#2B9FE6] hover:text-brand-black transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {animationGifs.slice(animIndex, animIndex + 3).map((pair, i) => (
                <div key={`${animIndex}-${i}`} className="flex flex-col gap-8">
                  {/* CIMA */}
                  <div className="glass-card rounded-[2rem] overflow-hidden border-white/5 group aspect-video relative shadow-xl hover:border-[#2B9FE6]/30 transition-all duration-500 flex items-center justify-center">
                    <video
                      src={pair.cima}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 z-10"></div>
                  </div>
                  {/* BAIXO */}
                  <div className="glass-card rounded-[2rem] overflow-hidden border-white/5 group aspect-video relative shadow-xl hover:border-[#2B9FE6]/30 transition-all duration-500 flex items-center justify-center">
                    <video
                      src={pair.baixo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UI DESIGN heading (before work cards) */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#2B9FE6]"></span>
              <h3 className="font-orbitron text-[#2B9FE6] font-bold text-xl tracking-[0.4em] uppercase">UI DESIGN</h3>
            </div>
          </div>

          {/* Work carousel controls (moved down to avoid clashing with animation controls) */}
          <div className="flex justify-end gap-4 mb-6">
            <button onClick={prevWork} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#2B9FE6] transition-all"><ChevronLeft size={24} /></button>
            <button onClick={nextWork} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#2B9FE6] transition-all"><ChevronRight size={24} /></button>
          </div>

          <div className="relative overflow-hidden mb-14 md:mb-20">
            <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transform: `translateX(-${workIndex * (isMobile ? 100 : 100 / 3)}%)` }}>
              {myWork.map((work, i) => (
                <div key={i} className="min-w-full md:min-w-[33.33%] p-4">
                  <div className="group glass-card rounded-[2.5rem] overflow-hidden border-white/5 hover:border-[#2B9FE6]/40 transition-all duration-500 shadow-2xl h-full flex flex-col text-left">
                    <div className="h-64 overflow-hidden relative bg-white/5">
                      <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                      <div className="absolute top-6 right-6"><PlatformBadge platform={work.platform} /></div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h4 className="font-orbitron text-xl font-black text-white group-hover:text-[#2B9FE6] transition-colors uppercase mb-1">{work.title}</h4>
                      <p className="font-inter text-xs text-white/30 font-bold uppercase tracking-widest mb-6">{work.type}</p>
                      <button onClick={() => setSelectedProject(work)} className="w-full py-4 bg-[#2B9FE6]/10 border border-[#2B9FE6]/30 rounded-2xl font-orbitron text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-[#2B9FE6] hover:text-brand-black transition-all flex items-center justify-center gap-3 mt-auto">
                        Explore project <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Principal <span className="text-[#2B9FE6]">Games</span></h2>
            <div className="h-6 mb-6 flex items-center justify-center" aria-live="polite">
              {livePlayers.hasData && (
                <p className="flex items-center gap-3 font-orbitron text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-[0.3em]">
                  <LiveDot />
                  <span><span className="text-emerald-400">{formatPlayers(livePlayers.total)}</span> players online now</span>
                </p>
              )}
            </div>
            <GamesMarquee items={sortedGames} />
          </div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
          .games-marquee-track { will-change: transform; }
          @media (prefers-reduced-motion: reduce) {
            .games-marquee-copy { display: none; }
            .games-marquee-viewport { overflow-x: auto; }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(43, 159, 230, 0.3);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(43, 159, 230, 0.6);
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </>
  );
};
