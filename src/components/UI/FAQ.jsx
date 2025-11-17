import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    id: 1,
    icon: '🕒',
    question: 'Quels sont vos délais de livraison ?',
    answer: '2-3 jours ouvrés en France métropolitaine. Expédition sous 24h pour les commandes passées avant 14h.'
  },
  {
    id: 2,
    icon: '🎨',
    question: 'Puis-je personnaliser ma bougie ?',
    answer: 'Absolument ! Couleurs, parfums, messages gravés, tout est personnalisable. Contactez-nous pour discuter de votre projet.'
  },
  {
    id: 3,
    icon: '💰',
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'Carte bancaire, PayPal, virement et paiement en plusieurs fois disponible à partir de 100€.'
  },
  {
    id: 4,
    icon: '🌿',
    question: 'Vos bougies sont-elles vraiment naturelles ?',
    answer: 'Oui ! Cire de soja 100% végétale, mèches en coton, parfums sans CMR. Éco-responsables et vegan.'
  },
  {
    id: 5,
    icon: '💍',
    question: 'Faites-vous des commandes pour mariages ?',
    answer: 'Oui ! Nous créons des bougies personnalisées pour mariages, anniversaires, événements d\'entreprise. Devis sur mesure.'
  },
  {
    id: 6,
    icon: '🔄',
    question: 'Quelle est votre politique de retour ?',
    answer: '14 jours de rétractation. Produits non utilisés uniquement. Retour gratuit en France métropolitaine.'
  }
];

function FAQItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`border-2 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
        isOpen
          ? 'border-caramel bg-gradient-to-br from-amber-50/80 to-cream-50/80 shadow-xl'
          : 'border-caramel/20 bg-gradient-to-br from-cream-50/50 to-white/50 shadow-sm hover:shadow-md hover:border-caramel/40'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-300 ${
          isOpen ? 'bg-gradient-to-r from-amber-50/50 to-transparent' : 'hover:bg-cream-50/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.span
            animate={{
              scale: isOpen ? 1.2 : 1,
              rotate: isOpen ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl"
          >
            {item.icon}
          </motion.span>
          <h3 className={`font-display text-lg font-semibold transition-colors duration-300 ${
            isOpen ? 'text-caramel-dark' : 'text-charcoal'
          }`}>
            {item.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
            isOpen ? 'text-caramel-dark' : 'text-caramel'
          }`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.1
                }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.2
                }
              }
            }}
            className="overflow-hidden border-t-2 border-caramel/10"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-6 pb-5 pt-4 bg-gradient-to-b from-amber-50/20 to-transparent"
            >
              <p className="text-charcoal/80 leading-relaxed pl-11 font-medium">
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-cream-50/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Questions <span className="text-gradient">Fréquentes</span>
          </h2>
          <p className="text-charcoal/60 text-lg">
            Tout ce que vous devez savoir sur nos bougies artisanales
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FAQItem item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
