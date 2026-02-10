
import React, { useMemo } from 'react';

export const GalaxyBackground: React.FC = () => {
  // Camada 1: Milhares de estrelas minúsculas fixas para textura de fundo
  const tinyStars = useMemo(() => {
    return Array.from({ length: 800 }).map((_, i) => ({
      id: `tiny-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  // Camada 2: Estrelas médias (bolinhas) que piscam
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: `twinkle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  // Camada 3: Bolinhas brancas maiores que flutuam suavemente para dar profundidade
  const floatingStars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: `float-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-[-10] overflow-hidden bg-[#010206]">
      {/* Nebulosas Profundas (Efeito Via Láctea) */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] rotate-[-15deg] opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, 
                rgba(13, 37, 73, 0.4) 0%, 
                rgba(25, 15, 55, 0.2) 30%, 
                transparent 70%
              )
            `,
            filter: 'blur(100px)'
          }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-5%] w-[100%] h-[100%] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(74, 144, 226, 0.08) 0%, transparent 60%)',
            filter: 'blur(120px)'
          }}
        />
      </div>

      {/* Estrelas Minúsculas Estáticas */}
      {tinyStars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Estrelas Médias Cintilantes */}
      {twinklingStars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: star.size > 1.5 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.3)` : 'none',
          }}
        />
      ))}

      {/* Bolinhas Brancas Flutuantes (O efeito pedido) */}
      {floatingStars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-float"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Efeito de vinheta nas bordas para profundidade */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  );
};
