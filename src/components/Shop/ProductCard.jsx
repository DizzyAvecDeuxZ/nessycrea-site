import { motion } from 'framer-motion';
import { Star, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  const sizeColors = {
    petit: 'bg-emerald-100 text-emerald-700',
    moyen: 'bg-blue-100 text-blue-700',
    grand: 'bg-purple-100 text-purple-700',
  };

  const stockColors = {
    in_stock: 'bg-green-500/90 text-white',
    low_stock: 'bg-orange-500/90 text-white',
    pre_order: 'bg-blue-500/90 text-white',
    out_of_stock: 'bg-gray-500/90 text-white',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="card-cosy h-full flex flex-col relative overflow-hidden">
        {/* Image */}
        <div className="relative mb-5 overflow-hidden rounded-2xl">
          <div
            className="aspect-square w-full"
            style={{ backgroundColor: product.image_color }}
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Stock badge - top left */}
          {product.stock && (
            <div
              className={`absolute top-3 left-3 px-3 py-1.5 backdrop-blur-sm rounded-full text-xs font-semibold shadow-lg ${
                stockColors[product.stock]
              }`}
            >
              {product.stockLabel}
            </div>
          )}

          {/* Size badge - top right */}
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
              sizeColors[product.size]
            }`}
          >
            {product.sizeLabel}
          </div>

          {/* Type badge - bottom left */}
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-caramel-dark shadow-md">
            {product.type}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-4 gap-2">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewDetails(product)}
              className="bg-white/90 backdrop-blur-sm text-charcoal px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform group-hover:translate-y-0 transition-transform"
            >
              <Eye className="w-4 h-4" />
              Voir détails
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-xl font-semibold text-charcoal mb-2 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(product.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-warm text-amber-warm"
              />
            ))}
            <span className="text-xs text-charcoal/50 ml-1">
              ({product.rating}/5)
            </span>
          </div>

          <p className="text-charcoal/60 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-caramel/10">
            <span className="font-display text-xl font-bold text-gradient">
              {product.price.toFixed(2)} €
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart(product)}
              className="w-10 h-10 bg-gradient-to-r from-amber-warm to-caramel rounded-full flex items-center justify-center text-cream-50 shadow-soft hover:shadow-glow transition-shadow"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
