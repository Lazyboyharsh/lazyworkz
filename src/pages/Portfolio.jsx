import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Filter } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  // REALISTIC PROJECT DATA
  const projects = [
    { id: 1, title: "AGJ DATA INFOTECH", category: "Company Profile Website", type: "Web", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80" },
    { id: 2, title: "TechStart Logo", category: "Brand Identity", type: "Branding", img: "https://images.unsplash.com/photo-1626785774573-4b79931256aa?w=800&q=80" },
    { id: 3, title: "Green Cafe", category: "Restaurant Website", type: "Web", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
    { id: 4, title: "Market Trends 2024", category: "Data Analysis Report", type: "Data", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { id: 5, title: "Law Firm SEO", category: "SEO Optimization", type: "Data", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80" },
    { id: 6, title: "Urban Fashion", category: "E-Commerce Store", type: "Web", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  ];

  // Filter Logic
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.type === filter);

  return (
    <div className="pt-16 w-full overflow-x-hidden font-sans bg-gray-50 min-h-screen">
      
      {/* 1. HERO HEADER */}
      <header className="relative py-24 bg-white text-center border-b border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Our Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Work</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Quality over quantity. Here are the recent projects we are proud of.
            </p>
          </motion.div>
        </div>
      </header>

      {/* 2. FILTER BUTTONS */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {['All', 'Web', 'Branding', 'Data'].map((category) => (
            <button 
              key={category}
              onClick={() => setFilter(category)}
              className={`
                px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 
                ${filter === category 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3. PROJECT GRID */}
        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-80 bg-gray-900"
              >
                {/* Image */}
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                
                {/* Dark Overlay Gradient (Better readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-6">
                  
                  <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                  
                  <h3 className="text-white text-3xl font-bold mb-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.title}
                  </h3>

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 hover:bg-orange-500 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24 bg-gray-900 text-center mt-12 relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-orange-500/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Want to be our next success story?
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              We are currently accepting new projects for this month.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-10 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-xl hover:shadow-orange-500/20 transform hover:-translate-y-1"
            >
              Start Your Project
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;