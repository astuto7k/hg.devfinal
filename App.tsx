
import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GalaxyBackground } from './components/GalaxyBackground';

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-inter selection:bg-brand-primary selection:text-black relative bg-transparent">
      <GalaxyBackground />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
