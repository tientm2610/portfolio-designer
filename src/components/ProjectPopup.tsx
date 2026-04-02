import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, ProjectItem } from '../services/portfolioService';
import { X, Eye } from 'lucide-react';

interface Props {
  category: Category | null;
  onClose: () => void;
}

const ProjectPopup: React.FC<Props> = ({ category, onClose }) => {
  // Prevent body scroll when open
  React.useEffect(() => {
    if (category) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [category]);

  const handleDownload = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {category && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-12 overflow-hidden"
        >
          {/* Glass Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-7xl bg-background border border-white/10 rounded-3xl overflow-y-auto custom-scrollbar flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-8 bg-background/80 backdrop-blur-md border-b border-white/5">
              <div>
                <h2 className="text-3xl font-light text-white">{category.title}</h2>
                <p className="text-white/50 text-sm mt-1">{category.items.length} works in this collection</p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item: ProjectItem) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-white/5">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        controls
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}

                    {/* Download Button overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white/90 font-medium truncate pr-4">{item.title}</span>
                      <button
                        onClick={(e) => handleDownload(e, item.url)}
                        className="shrink-0 p-2 bg-accent text-accent-foreground rounded-full hover:scale-110 transition-transform"
                        title="Download/Open Original"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPopup;
