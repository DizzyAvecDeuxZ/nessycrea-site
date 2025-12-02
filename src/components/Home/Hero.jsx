import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FlameIcon } from '../UI/Icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient - assombri */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/40 via-charcoal/10 to-cream-100/40" />
      </div>

      {/* Decorative candle flames */}
      <div className="absolute top-1/3 left-16 hidden lg:block">
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-14 bg-gradient-to-t from-amber-warm via-amber-glow to-honey-light rounded-full blur-sm opacity-50"
        />
      </div>
      <div className="absolute top-1/2 left-32 hidden lg:block">
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-5 h-10 bg-gradient-to-t from-caramel via-amber-warm to-yellow-100 rounded-full blur-sm opacity-40"
        />
      </div>
      <div className="absolute bottom-1/3 right-24 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="w-6 h-12 bg-gradient-to-t from-caramel via-amber-warm to-yellow-100 rounded-full blur-sm opacity-45"
        />
      </div>
      <div className="absolute bottom-1/2 right-40 hidden lg:block">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="w-4 h-8 bg-gradient-to-t from-amber-warm/80 via-amber-light to-yellow-50 rounded-full blur-sm opacity-35"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-cream-200/60 backdrop-blur-md rounded-full border border-caramel/10 shadow-soft">
            <FlameIcon className="w-5 h-5 text-amber-warm" animated />
            <span className="text-sm font-semibold text-caramel-dark tracking-wide">
              Artisanat français depuis 2020
            </span>
            <Sparkles className="w-4 h-4 text-amber-warm/60" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-charcoal mb-10 leading-[0.9] tracking-tightest"
        >
          Illuminez
          <br />
          <span className="relative inline-block">
            votre
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-amber-warm/40 to-caramel/30 -skew-x-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>{' '}
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(to right, #8B4513, #D4A574, #FFD700, #D4A574, #8B4513)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(212, 165, 116, 0.4))'
            }}
          >
            intérieur
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-2xl lg:text-[1.65rem] text-charcoal/65 max-w-3xl mx-auto mb-14 leading-relaxed font-light px-4"
        >
          Bougies artisanales créées avec passion pour transformer chaque moment
          en une expérience sensorielle <span className="font-medium text-charcoal/80">unique</span> et <span className="font-medium text-charcoal/80">chaleureuse</span>.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link to="/boutique">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg group shadow-glow-lg"
            >
              <span>Découvrir la collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.button>
          </Link>
          <Link to="/a-propos">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-lg"
            >
              Notre histoire
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-12 max-w-3xl mx-auto px-4"
        >
          {[
            { value: '100%', label: 'Naturel' },
            { value: '500+', label: 'Clients satisfaits' },
            { value: '50h', label: 'Durée moyenne' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center group cursor-default bg-white/60 backdrop-blur-md border border-caramel/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-caramel/40 transition-all duration-300"
            >
              <div className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-gradient mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-charcoal/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-7 h-12 border-2 border-charcoal/20 rounded-full flex justify-center pt-3 backdrop-blur-xs"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-gradient-to-b from-caramel to-amber-warm rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
