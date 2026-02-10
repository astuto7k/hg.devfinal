
import React from 'react';
import { Home, User, Briefcase, Zap, Globe, MessageSquare } from 'lucide-react';

export const SideNav: React.FC = () => {
  const menu = [
    { icon: <Home size={20} />, href: '#', label: 'Home' },
    { icon: <Zap size={20} />, href: '#nexus', label: 'Nexus' },
    { icon: <Briefcase size={20} />, href: '#projects', label: 'Work' },
    { icon: <User size={20} />, href: '#about', label: 'Bio' },
    { icon: <MessageSquare size={20} />, href: '#contact', label: 'Comm' },
  ];

  return (
    <nav className="fixed left-0 md:top-0 bottom-0 md:h-screen w-full md:w-24 lg:w-32 z-[100] bg-brand-black/50 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/5 flex md:flex-col justify-center items-center py-4 md:py-0 gap-8">
      <div className="hidden md:flex flex-col items-center absolute top-8 mb-12">
        <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/30 rounded-full flex items-center justify-center font-orbitron font-black text-brand-primary">
          HG
        </div>
      </div>

      <div className="flex md:flex-col gap-6 lg:gap-10">
        {menu.map((item) => (
          <a 
            key={item.label}
            href={item.href}
            className="p-3 text-white/40 hover:text-brand-primary transition-all duration-300 relative group flex flex-col items-center"
          >
            {item.icon}
            <span className="absolute left-full ml-4 px-3 py-1 bg-brand-primary text-black font-orbitron text-[9px] font-black opacity-0 group-hover:opacity-100 transition-all rounded whitespace-nowrap hidden md:block">
              {item.label}
            </span>
            <span className="text-[8px] font-orbitron mt-1 md:hidden">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};
