
import React from 'react';

const experiences = [
  {
    title: "Game Producer",
    company: "Steal a Brainrot",
    period: "Current",
    desc: "Overseeing game production pipeline, viral marketing, and strategic growth for one of the scene's rising titles."
  },
  {
    title: "Roblox Community Ambassador",
    company: "Roblox",
    period: "Ongoing",
    desc: "Bridging the gap between corporate vision and the developer community in the Brazilian ecosystem."
  },
  {
    title: "UGC Creator",
    company: "Roblox Marketplace",
    period: "2020 - Present",
    desc: "Creating and scaling virtual product lines with over 3,000,000 individual sales to date."
  },
  {
    title: "Discord Community Leader",
    company: "Roblox Developers",
    period: "2019 - Present",
    desc: "Managing a high-level community of 12,000+ developers, fostering collaboration and knowledge exchange."
  },
  {
    title: "Content Creator",
    company: "YouTube & TikTok",
    period: "2018 - Present",
    desc: "Built an audience of 650k+ subscribers with focused content on game development and Roblox culture."
  },
  {
    title: "Game Marketing Specialist",
    company: "Freelance",
    period: "2017 - Present",
    desc: "Advising studios on community growth, influencer outreach, and player retention strategies."
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-brand-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h3 className="font-orbitron text-brand-red font-bold tracking-widest uppercase text-sm">Track Record</h3>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black uppercase">Experience <span className="text-brand-red">Timeline</span></h2>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group flex flex-col md:flex-row gap-6 md:gap-12 relative pb-12 last:pb-0 border-l border-white/10 pl-8 md:pl-0 md:border-l-0">
              <div className="md:w-1/3 md:text-right">
                <p className="font-orbitron text-brand-red font-bold text-sm tracking-widest uppercase">{exp.period}</p>
                <h4 className="font-orbitron text-xl font-black mt-1 group-hover:text-brand-red transition-colors uppercase">{exp.title}</h4>
                <p className="text-white/40 text-sm font-inter">{exp.company}</p>
              </div>
              
              <div className="hidden md:block w-px bg-white/10 relative">
                <div className="absolute top-2 -left-1 w-2 h-2 rounded-full bg-brand-red group-hover:scale-150 transition-transform"></div>
              </div>

              <div className="md:w-2/3">
                <p className="text-white/60 leading-relaxed font-inter">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
