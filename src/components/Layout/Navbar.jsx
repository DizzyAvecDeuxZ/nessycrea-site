import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../Cart/CartContext';
import Logo from '../UI/Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/boutique', label: 'Boutique' },
    { to: '/a-propos', label: 'À propos' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-soft py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-cream-100 shadow-soft transition-transform duration-300 group-hover:scale-105 p-2">
            <img
              src="/logo-nessycrea.png"
              alt="NessyCrea"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                location.pathname === link.to
                  ? 'text-amber-warm'
                  : 'text-charcoal/70 hover:text-charcoal'
              }`}
            >
              {location.pathname === link.to && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-cream-200/80 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative group"
          >
            <div className="w-12 h-12 bg-cream-200/80 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-cream-300 group-hover:shadow-soft transition-all duration-300">
              <ShoppingBag className="w-5 h-5 text-charcoal-light" />
            </div>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-warm to-amber-deep rounded-full flex items-center justify-center shadow-glow"
              >
                <span className="text-xs font-bold text-cream-50">
                  {cartCount}
                </span>
              </motion.div>
            )}
          </motion.button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center hover:bg-cream-300 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4 mx-6 rounded-2xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-cream-200 text-amber-warm'
                      : 'text-charcoal/70 hover:bg-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
