import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../Cart/CartContext';
import ProductCard from '../components/Shop/ProductCard';
import ProductModal from '../components/Shop/ProductModal';
import Filters from '../components/Shop/Filters';
import { Flame, Car, Droplet } from 'lucide-react';

export default function Shop({ onAddToCart }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('bougies');
  const [filters, setFilters] = useState({
    type: '',
    price: '',
    size: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { 
      id: 'bougies', 
      label: 'Bougies', 
      icon: Flame,
      types: ['Gourmand', 'Relaxation', 'Naturel', 'Luxe'],
      description: 'Nos bougies artisanales fabriquées avec passion',
      showSizeFilter: true
    },
    { 
      id: 'diffuseurs', 
      label: 'Diffuseurs Voiture', 
      icon: Car,
      types: ['Diffuseurs'],
      description: 'Parfumez vos trajets avec nos diffuseurs',
      showSizeFilter: false
    },
    { 
      id: 'fondants', 
      label: 'Fondants', 
      icon: Droplet,
      types: ['Fondants'],
      description: 'Fondants parfumés pour brûle-parfum',
      showSizeFilter: true
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ type: '', price: '', size: '' });
  };

  // Filter products by active category
  const categoryProducts = useMemo(() => {
    const activeTypes = categories.find(cat => cat.id === activeCategory)?.types || [];
    return products.filter(product => activeTypes.includes(product.type));
  }, [activeCategory]);

  // Apply filters to category products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      if (filters.type && product.type !== filters.type) return false;
      if (filters.price === 'low' && product.price >= 25) return false;
      if (
        filters.price === 'mid' &&
        (product.price < 25 || product.price > 30)
      )
        return false;
      if (filters.price === 'high' && product.price <= 30) return false;
      if (filters.size && product.size !== filters.size) return false;
      return true;
    });
  }, [categoryProducts, filters]);

  const handleAddToCart = (product) => {
    addToCart(product);
    onAddToCart(product.name);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    resetFilters();
  };

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  return (
    <main className="pt-24 md:pt-32 pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-charcoal mb-4">
            Notre <span className="text-gradient">Boutique</span>
          </h1>
          <p className="text-charcoal/60 text-base md:text-lg max-w-2xl mx-auto">
            Découvrez notre collection complète de produits artisanaux,
            fabriqués avec passion et des ingrédients naturels.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-caramel to-amber-warm text-white shadow-glow-lg'
                      : 'bg-cream-100/60 text-charcoal/70 hover:bg-cream-200/80 border border-caramel/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-caramel-dark'}`} />
                  <span>{category.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-caramel to-amber-warm rounded-2xl -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Category Description */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-charcoal/60 mt-6 text-sm md:text-base"
          >
            {activeCategoryData?.description}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <Filters
          filters={filters}
          onChange={handleFilterChange}
          onReset={resetFilters}
          availableTypes={activeCategoryData?.types || []}
          showSizeFilter={activeCategoryData?.showSizeFilter ?? true}
        />

        {/* Products count */}
        <motion.div
          key={`${activeCategory}-count`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-charcoal/60"
        >
          {filteredProducts.length} produit
          {filteredProducts.length > 1 ? 's' : ''} trouvé
          {filteredProducts.length > 1 ? 's' : ''}
        </motion.div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">
                {activeCategory === 'bougies' ? '🕯️' : activeCategory === 'diffuseurs' ? '🚗' : '🔥'}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-charcoal mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-charcoal/60 mb-6">
              Essayez de modifier vos filtres pour voir plus de produits.
            </p>
            <button onClick={resetFilters} className="btn-secondary">
              Réinitialiser les filtres
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}
