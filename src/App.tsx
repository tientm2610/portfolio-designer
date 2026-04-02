import { useEffect, useState } from 'react';
import Hero from './components/sections/Hero';
import CategoryCard from './components/CategoryCard';
import ProjectPopup from './components/ProjectPopup';
import { fetchPortfolioData, Category } from './services/portfolioService';
import { CONFIG } from './constants/config';
import { MapPin, Phone } from 'lucide-react';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    document.title = CONFIG.PERSONAL.NICKNAME + " | Portfolio";
    async function loadData() {
      const data = await fetchPortfolioData();
      setCategories(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter">
          {CONFIG.PERSONAL.NICKNAME.split(' ')[0]}<span className="text-gradient-accent"></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <main>
        <Hero />

        {/* Dynamic Categories Grid */}
        <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Select <span className="font-semibold text-gradient-accent">Collection</span></h2>
            <p className="text-white/60 max-w-2xl text-lg">
              Explore my disciplines below. Click a category to view the full gallery.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : categories.length === 0 ? (
            <div className="glass p-12 text-center rounded-2xl">
              <h3 className="text-xl text-white/80">No categories found.</h3>
              <p className="text-white/50 mt-2">Please check your Google Sheets API URL in the .env file.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center border-t border-white/5">
          <h2 className="text-4xl md:text-5xl font-light mb-12">Let's <span className="font-semibold text-gradient-accent">Connect</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-12 text-white/70">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="text-accent" size={24} />
              <span>{CONFIG.PERSONAL.LOCATION}</span>
            </div>
            {CONFIG.PERSONAL.PHONE && (
              <div className="flex items-center justify-center gap-3">
                <Phone className="text-accent" size={24} />
                <span>{CONFIG.PERSONAL.PHONE}</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-4 mt-6 md:mt-0">
              <a href={CONFIG.SOCIALS.FB_URL} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Facebook</a>
              <a href={CONFIG.SOCIALS.IG_URL} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-white/40 text-sm border-t border-white/5">
        &copy; {new Date().getFullYear()} {CONFIG.PERSONAL.NAME}. {CONFIG.PERSONAL.COLLEGE}.
      </footer>

      {/* Fullscreen Gallery Modal */}
      <ProjectPopup
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </div>
  );
}

export default App;
