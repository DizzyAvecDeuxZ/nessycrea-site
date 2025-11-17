import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import Logo from '../UI/Logo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="bg-charcoal text-cream-100 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-warm/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-gradient-to-tl from-caramel/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-8 py-12">
        {/* Newsletter */}
        <div className="mb-10 pb-10 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-3">
              Restez informé de nos nouveautés
            </h3>
            <p className="text-cream-100/60 mb-6">
              Inscrivez-vous à notre newsletter et recevez nos offres exclusives et nouveaux parfums
            </p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium">
                <Check className="w-5 h-5" />
                <span>Merci ! Vous êtes inscrit à notre newsletter</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-cream-100 placeholder-cream-100/40 focus:outline-none focus:border-amber-warm transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-warm to-caramel text-charcoal font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size="md" animated={false} />
              <span className="font-display text-xl font-bold">NessyCrea</span>
            </div>
            <p className="text-cream-100/60 text-sm leading-relaxed mb-4">
              Bougies artisanales depuis 2020
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-warm/30 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-warm/30 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/boutique', label: 'Boutique' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-cream-100/60 hover:text-amber-warm transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-cream-100/60 text-sm">
                <MapPin className="w-4 h-4 text-amber-warm flex-shrink-0" />
                <span>Paris, France</span>
              </div>
              <div className="flex items-center gap-2 text-cream-100/60 text-sm">
                <Mail className="w-4 h-4 text-amber-warm flex-shrink-0" />
                <span>contact@nessycrea.fr</span>
              </div>
              <div className="flex items-center gap-2 text-cream-100/60 text-sm">
                <Phone className="w-4 h-4 text-amber-warm flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom with sparkle line */}
        <div className="pt-6 relative">
          {/* Sparkling golden line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
            {/* Base golden line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-warm to-transparent opacity-50" />

            {/* Sparkle effects */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-1"
                style={{
                  left: `${i * 12.5}%`,
                  animation: `sparkle ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <div className="h-full bg-gradient-to-r from-transparent via-amber-glow to-transparent" />
              </div>
            ))}

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-warm/30 to-transparent blur-sm animate-pulse" />
          </div>

          <div className="text-center">
            <p className="text-cream-100/40 text-sm mb-2">
              © 2024 NessyCrea. Tous droits réservés. Fait avec ♥ en France
            </p>
            <p className="text-amber-warm/60 text-xs italic">
              ✨ Joyeuses fêtes de fin d'année ✨
            </p>
          </div>
        </div>
      </div>

      {/* Sparkle animation */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scaleX(0);
          }
          50% {
            opacity: 1;
            transform: scaleX(3);
          }
        }
      `}</style>
    </footer>
  );
}
