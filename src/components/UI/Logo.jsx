import { motion } from 'framer-motion';

export default function Logo({ size = 'md', animated = true }) {
  const sizes = {
    sm: { size: 'w-10 h-10' },
    md: { size: 'w-12 h-12' },
    lg: { size: 'w-16 h-16' },
  };

  const s = sizes[size];

  return (
    <motion.div
      whileHover={animated ? { scale: 1.05 } : {}}
      className={`${s.size} relative`}
    >
      {/* Logo container with beige background */}
      <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#E8DCC8', clipPath: 'circle(50%)' }}>
        <img
          src="/logo-nessycrea.png"
          alt="NessyCrea Logo"
          className="object-cover"
          style={{ width: '110%', height: '110%' }}
        />
      </div>

      {/* Glow effect */}
      {animated && (
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-1 bg-gradient-to-r from-amber-warm/30 to-caramel/20 rounded-full blur-lg -z-10"
        />
      )}
    </motion.div>
  );
}
