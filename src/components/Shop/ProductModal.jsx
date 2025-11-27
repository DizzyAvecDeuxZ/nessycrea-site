import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Droplet, Ruler } from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal - centered with flex */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-cream-50 rounded-3xl shadow-glow-lg p-8 pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-cream-200 rounded-full flex items-center justify-center hover:bg-cream-300 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div
                  className="aspect-square rounded-2xl overflow-hidden"
                  style={{ backgroundColor: product.image_color }}
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <div className="inline-block px-3 py-1 bg-cream-200 rounded-full text-sm font-medium text-caramel-dark w-fit mb-4">
                    {product.type}
                  </div>

                  <h2 className="font-display text-3xl font-bold text-charcoal mb-3">
                    {product.name}
                  </h2>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-warm text-amber-warm"
                      />
                    ))}
                    <span className="text-sm text-charcoal/60 ml-2">
                      {product.rating}/5 - Avis clients
                    </span>
                  </div>

                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-charcoal/70">
                      <Droplet className="w-5 h-5 text-amber-warm" />
                      <span>
                        <strong>Parfum:</strong> {product.scent}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-charcoal/70">
                      <Ruler className="w-5 h-5 text-amber-warm" />
                      <span>
                        <strong>Taille:</strong> {product.sizeLabel}
                      </span>
                    </div>
                  </div>

                  <div className="bg-cream-200/50 rounded-xl p-5 mb-6 text-center">
                    <div className="text-sm text-charcoal/60 mb-2 font-semibold uppercase tracking-wide">
                      Composition
                    </div>
                    <div className="text-charcoal font-medium text-base leading-relaxed">
                      Cire végétale, mèche coton bio, parfum naturel
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-3xl font-bold text-gradient">
                        {product.price.toFixed(2)} €
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="btn-primary w-full text-lg"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
