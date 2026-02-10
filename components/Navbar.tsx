
import React from 'react';

export const Navbar: React.FC = () => {
  const links = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-8 md:px-16 flex justify-between items-center bg-transparent backdrop-blur-[2px]">
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-11 h-11 bg-brand-black/60 rounded-full flex items-center justify-center border border-white/10 group-hover:border-brand-primary/50 transition-all duration-500 overflow-hidden">
           <img src="https://i.ibb.co.com/vFJvsy0/Logo-Hg-modified.png" className="w-full h-full rounded-full object-cover bg-white/5" alt="logo" />
        </div>
        <span className="font-orbitron text-2xl font-black text-white tracking-tighter">Hg<span className="text-brand-primary">.dev</span></span>
      </div>

      <div className="hidden md:flex gap-10">
        {links.map(link => (
          <a 
            key={link.name} 
            href={link.href}
            className="text-white/50 hover:text-brand-primary font-inter text-sm font-semibold transition-all duration-300 tracking-wide"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
