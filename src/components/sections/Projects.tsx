import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPortfolioMedia, ProjectItem } from '../../services/LocalDataService';

const Projects = () => {
  const [media, setMedia] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      const data = await getPortfolioMedia();
      setMedia(data);
      setLoading(false);
    }
    fetchMedia();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-light mb-4">Featured <span className="font-semibold text-gradient-accent">Works</span></h2>
        <p className="text-white/60 max-w-2xl text-lg">
          A curated selection of my latest projects. Hover to explore.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(43,74%,49%)]"></div>
        </div>
      ) : media.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl">
          <h3 className="text-xl text-white/80">Chưa có dự án nào.</h3>
          <p className="text-white/50 mt-2">Hãy cập nhật file public/projects.json để hiển thị dự án của bạn.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {media.map((item) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className="group relative aspect-video overflow-hidden rounded-2xl bg-card border border-white/5 cursor-pointer"
            >
              {item.type === 'video' ? (
                <video 
                  src={item.url} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white/90 font-medium tracking-wider text-sm uppercase">{item.title}</span>
                {item.description && <p className="text-white/60 text-xs mt-1">{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
