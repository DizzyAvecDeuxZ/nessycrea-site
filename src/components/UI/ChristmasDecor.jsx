import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Composant flocon de neige
function Snowflake({ delay, duration, left, size }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: '100vh',
        opacity: [0, 0.8, 0.8, 0],
        x: [0, 30, -30, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute text-white/40"
      style={{ left: `${left}%`, fontSize: `${size}px` }}
    >
      ❄
    </motion.div>
  );
}

// Composant étoile scintillante
function TwinkleStar({ delay, left, top }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute text-amber-warm/60"
      style={{ left: `${left}%`, top: `${top}%`, fontSize: '16px' }}
    >
      ✨
    </motion.div>
  );
}

// Composant principal de décoration de Noël
export default function ChristmasDecor() {
  const [snowflakes, setSnowflakes] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Générer moins de flocons sur mobile pour de meilleures performances
    const isMobile = window.innerWidth < 768;
    const flakeCount = isMobile ? 12 : 20;
    const starCount = isMobile ? 5 : 10;

    const flakes = Array.from({ length: flakeCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 8,
      left: Math.random() * 100,
      size: 10 + Math.random() * 8,
    }));

    const starsList = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      top: Math.random() * 80,
    }));

    setSnowflakes(flakes);
    setStars(starsList);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Flocons de neige */}
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          delay={flake.delay}
          duration={flake.duration}
          left={flake.left}
          size={flake.size}
        />
      ))}

      {/* Étoiles scintillantes */}
      {stars.map((star) => (
        <TwinkleStar
          key={star.id}
          delay={star.delay}
          left={star.left}
          top={star.top}
        />
      ))}

      {/* Effet de lueur dorée subtile dans les coins */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-warm/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-glow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
}
