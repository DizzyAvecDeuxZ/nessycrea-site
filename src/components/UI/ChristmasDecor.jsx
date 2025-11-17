import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Composant flocon de neige
function Snowflake({ delay, duration, left }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: '100vh',
        opacity: [0, 1, 1, 0],
        x: [0, 20, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute text-white/30"
      style={{ left: `${left}%`, fontSize: '12px' }}
    >
      ❄
    </motion.div>
  );
}

// Composant principal de décoration de Noël
export default function ChristmasDecor() {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Générer 15 flocons avec des positions et timings aléatoires
    const flakes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      left: Math.random() * 100,
    }));
    setSnowflakes(flakes);
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
        />
      ))}

      {/* Petite guirlande lumineuse subtile en haut */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-2 h-2 rounded-full"
            style={{
              left: `${i * 5}%`,
              backgroundColor: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#FFD700' : '#FFA500',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
