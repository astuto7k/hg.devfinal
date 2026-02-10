
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ExternalLink, X } from 'lucide-react';

const PlatformBadge = ({ platform }: { platform: string }) => (
  <div className="px-3 py-1 rounded-full bg-[#2B9FE6]/10 border border-[#2B9FE6]/20 flex items-center gap-2">
    <span className="font-orbitron text-[8px] font-black text-[#2B9FE6] tracking-widest uppercase">{platform}</span>
  </div>
);

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
    { url: "https://www.youtube.com/embed/frFywxsrK3A" }, // 9 cima
    { url: "https://www.youtube.com/embed/eAEo4BNxz2E" }, // 8 cima
    { url: "https://www.youtube.com/embed/vysq3BSaLJY" }, // 7 cima
    { url: "https://www.youtube.com/embed/jCZ7FJqALx4" }, // 9 baixo
    { url: "https://www.youtube.com/embed/LW7XUR0thqg" }, // 8 baixo
    { url: "https://www.youtube.com/embed/W17Yt7P3T78" }, // 7 baixo

    { url: "https://www.youtube.com/embed/HGM95jrkFec" }, // 6 cima
    { url: "https://www.youtube.com/embed/fqqlMWF-l6A" }, // 5 cima
    { url: "https://www.youtube.com/embed/faNWu7M_7g4" }, // 4 cima
    { url: "https://www.youtube.com/embed/W0y8PlJ8F6c" }, // 6 baixo
    { url: "https://www.youtube.com/embed/s84FHPmzcdY" }, // 5 baixo
    { url: "https://www.youtube.com/embed/UgoFGoH6ZtM" }, // 4 baixo

    { url: "https://www.youtube.com/embed/JLSGy6IgQYc" }, // 3 cima
    { url: "https://www.youtube.com/embed/vIVMpHD_PhY" }, // 2 cima
    { url: "https://www.youtube.com/embed/1cs1wf35jes" }, // 1 cima
    { url: "https://www.youtube.com/embed/ujRP1NhTgn8" }, // 3 baixo
    { url: "https://www.youtube.com/embed/u5ypJXFu8Ms" }, // 2 baixo
    { url: "https://www.youtube.com/embed/Ibfb9BQPy5Y" }  // 1 baixo
  ];

  const principalGames = [
    { title: "Dead Sky", type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/661pd10/Deadsky.png", url: "https://www.roblox.com/games/132651897588092/Dead-Sky" },
    { title: "Anime Royale", type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/d0Pxf2gP/animeroyale.png", url: "https://www.roblox.com/games/16347800591/Anime-Royale" },
    { title: "Steal a Brainrot", type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/Cp3M7tc3/robabrainrot.png", url: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot" },
    { title: "Break a Lucky Block!", type: "VFX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co/5gm6zZ2r/no-Filter.jpg", url: "https://www.roblox.com/games/124311897657957/Break-a-Lucky-Block" },
    { title: "FRUITS VS BRAINROTS", type: "Animation", platform: "Fortinite", btn: "Open Fortnite", img: "https://i.ibb.co/vxqMtW2P/landscape-comp.jpg", url: "https://fortnite.gg/island?code=4554-4413-1515" },
    { title: "Dead Sails", type: "Systems", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/7JD05kKg/deadails.png", url: "https://www.roblox.com/games/85832836496852/Dead-Sails" },
    { title: "Labubu Horror", type: "UI/UX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/svvhcD85/labubu.png", url: "https://www.roblox.com/games/123755963456017/Labubu-Horror" },
    { title: "100 Players vs 1 Gorilla", type: "Animation", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co/LT1ytQJ/100vs1gorila.png", url: "https://www.roblox.com/games/114312759142223/100-Players-vs-1-Gorilla" },
    { title: "My Brainrot Island", type: "VFX", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co/99cj5QKB/brainrotisland.png", url: "https://www.roblox.com/games/122345408677744/My-Brainrot-Island" },
    { title: "Brainrot Garden", type: "Systems", platform: "Roblox", btn: "Open Roblox", img: "https://i.ibb.co.com/YFVyf0BW/Brainrotgarden.png", url: "https://www.roblox.com/games/132651897588092/Dead-Sky" }
  ];

  const nextWork = () => setWorkIndex((prev) => (prev + 1) % (myWork.length - 2));
  const prevWork = () => setWorkIndex((prev) => (prev - 1 + (myWork.length - 2)) % (myWork.length - 2));

  const nextAnim = () => setAnimIndex((prev) => (prev + 6) % animationGifs.length);
  const prevAnim = () => setAnimIndex((prev) => (prev - 6 + animationGifs.length) % animationGifs.length);

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
                        <img src={img} className="w-full h-full object-cover" alt={`thumb ${i}`} />
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
      <div id="portfolio" className="relative reveal reveal-up pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-left">
            <div>
              <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">My <span className="text-[#2B9FE6]">Work</span></h2>
              <p className="font-inter text-white/40 text-base max-w-xl">Detailed previews with UI, motion, and VFX breakdowns.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={prevWork} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#2B9FE6] transition-all"><ChevronLeft size={24} /></button>
              <button onClick={nextWork} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#2B9FE6] transition-all"><ChevronRight size={24} /></button>
            </div>
          </div>

          <div className="relative overflow-hidden mb-40">
            <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transform: `translateX(-${workIndex * (100 / 3)}%)` }}>
              {myWork.map((work, i) => (
                <div key={i} className="min-w-full md:min-w-[33.33%] p-4">
                  <div className="group glass-card rounded-[2.5rem] overflow-hidden border-white/5 hover:border-[#2B9FE6]/40 transition-all duration-500 shadow-2xl h-full flex flex-col text-left">
                    <div className="h-64 overflow-hidden relative bg-white/5">
                      <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
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

          {/* New ANIMATION subsection */}
          <div className="mb-40 reveal reveal-up">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[2px] bg-[#2B9FE6]"></span>
                <h3 className="font-orbitron text-[#2B9FE6] font-bold text-xl tracking-[0.4em] uppercase">ANIMATION</h3>
              </div>
              <div className="flex gap-4">
                <button onClick={prevAnim} className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#2B9FE6] hover:text-brand-black transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextAnim} className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#2B9FE6] hover:text-brand-black transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {animationGifs.slice(animIndex, animIndex + 6).map((gif, i) => (
                <div key={i} className="glass-card rounded-[2rem] overflow-hidden border-white/5 group aspect-video relative shadow-xl hover:border-[#2B9FE6]/30 transition-all duration-500 flex items-center justify-center">
                  <iframe
                    src={`${gif.url}?autoplay=1&mute=1&loop=1&playlist=${gif.url.split('/').pop()}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1&fs=0`}
                    className="w-[150%] h-[150%] pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                  />
                  {/* Overlay to catch clicks and maintain GIF feel */}
                  <div className="absolute inset-0 z-10"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-16">Principal <span className="text-[#2B9FE6]">Games</span></h2>
            <div className="relative w-full overflow-hidden py-10">
              <div className="flex animate-marquee-fast whitespace-nowrap hover:[animation-play-state:paused]">
                {[...principalGames, ...principalGames, ...principalGames, ...principalGames].map((game, i) => (
                  <div key={i} className="inline-block px-4 w-[340px] text-left">
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
                ))}
              </div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-fast { animation: marquee-fast 12s linear infinite; }
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
