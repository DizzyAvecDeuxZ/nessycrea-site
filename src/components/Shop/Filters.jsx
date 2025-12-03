import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import CustomSelect from '../UI/CustomSelect';

export default function Filters({ filters, onChange, onReset, availableTypes = [], showSizeFilter = true }) {
  const hasActiveFilters =
    filters.type || filters.price || filters.size;

  // Build type options based on available types
  const typeOptions = [
    { value: '', label: 'Tous les types' },
    ...availableTypes.map(type => ({
      value: type,
      label: type === 'Diffuseurs' ? 'Diffuseurs Voiture' : type
    }))
  ];

  const priceOptions = [
    { value: '', label: 'Tous les prix' },
    { value: 'low', label: 'Moins de 25€' },
    { value: 'mid', label: '25€ - 30€' },
    { value: 'high', label: 'Plus de 30€' }
  ];

  const sizeOptions = [
    { value: '', label: 'Toutes tailles' },
    { value: 'petit', label: 'Petit (90-100g)' },
    { value: 'moyen', label: 'Moyen (160-180g)' },
    { value: 'grand', label: 'Grand (250-300g)' }
  ];

  // Only show type filter if there are multiple types
  const showTypeFilter = availableTypes.length > 1;
  
  // Calculate grid columns based on visible filters
  const visibleFiltersCount = (showTypeFilter ? 1 : 0) + 1 + (showSizeFilter ? 1 : 0);
  const gridCols = visibleFiltersCount === 1 ? 'sm:grid-cols-1' : visibleFiltersCount === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cream-100/80 backdrop-blur-sm rounded-2xl p-6 mb-10 sticky top-24 z-10"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-caramel-dark" />
          <span className="font-display text-lg font-semibold text-charcoal">
            Filtres
          </span>
        </div>

        <div className={`flex-1 grid grid-cols-1 ${gridCols} gap-4`}>
          {/* Type filter - only show if multiple types */}
          {showTypeFilter && (
            <CustomSelect
              label="Type"
              value={filters.type}
              onChange={(value) => onChange('type', value)}
              options={typeOptions}
              placeholder="Tous les types"
            />
          )}

          {/* Price filter */}
          <CustomSelect
            label="Prix"
            value={filters.price}
            onChange={(value) => onChange('price', value)}
            options={priceOptions}
            placeholder="Tous les prix"
          />

          {/* Size filter - conditional */}
          {showSizeFilter && (
            <CustomSelect
              label="Taille"
              value={filters.size}
              onChange={(value) => onChange('size', value)}
              options={sizeOptions}
              placeholder="Toutes tailles"
            />
          )}
        </div>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onReset}
            className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Réinitialiser</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
