import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../services/portfolioService';

interface Props {
  category: Category;
  onClick: () => void;
}

const CategoryCard: React.FC<Props> = ({ category, onClick }) => {
  // Use the very first item's url as the background
  const bgImgPreview = category.items.length > 0 ? category.items[0].url : "";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-white/5 cursor-pointer"
    >
      {/* Background Image */}
      {bgImgPreview && (
        <img
          src={bgImgPreview}
          alt={category.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-500 group-hover:from-accent/30" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white group-hover:translate-x-2 transition-transform duration-300">
          {category.title}
        </h3>
        <p className="text-white/50 text-sm mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 delay-75">
          {category.items.length} Projects
        </p>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
