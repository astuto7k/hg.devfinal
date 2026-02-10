
import React from 'react';

export const Footer: React.FC = () => {
  const links = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="pt-20 pb-12 px-8 md:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12 border-t border-white/5 pt-12">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-[#2B9FE6]/10 rounded-full flex items-center justify-center border border-[#2B9FE6]/20 group-hover:border-[#2B9FE6]/50 transition-all duration-500 overflow-hidden">
               <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                  <img src="https://i.ibb.co.com/vFJvsy0/Logo-Hg-modified.png" className="w-full h-full object-cover" alt="Hg.dev Logo" />
               </div>
            </div>
            <span className="font-orbitron text-2xl font-black text-white tracking-tighter">Hg<span className="text-[#2B9FE6]">.dev</span></span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white/40 hover:text-[#2B9FE6] font-inter text-sm font-bold transition-all duration-300 tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center">
          <p className="font-inter text-[11px] font-bold tracking-widest text-white/20 uppercase">
            {new Date().getFullYear()} Hg.dev - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
