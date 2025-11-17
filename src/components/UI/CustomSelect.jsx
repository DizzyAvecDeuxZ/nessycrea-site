import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ value, onChange, options, label, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Find selected option label
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-charcoal/70 mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-br from-white to-cream-50/50 border-2 border-caramel/20 rounded-xl cursor-pointer transition-all duration-300 hover:border-caramel hover:shadow-md hover:bg-white group"
      >
        <span className="text-charcoal font-medium text-[0.95rem]">
          {displayText}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-caramel transition-colors group-hover:text-caramel-dark" />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-caramel/20 rounded-xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: index * 0.05 }
                }}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3.5 text-left transition-all duration-200 ${
                  option.value === value
                    ? 'bg-gradient-to-r from-amber-50 to-caramel/10 text-charcoal font-semibold border-l-4 border-caramel'
                    : 'text-charcoal hover:bg-gradient-to-r hover:from-cream-50 hover:to-amber-50/50 hover:pl-6 hover:font-semibold'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
