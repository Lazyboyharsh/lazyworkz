import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

// Import Images
import agjImg from '../assets/agj.jpg';
import logoImg from '../assets/logo.png';
import dhanviImg from '../assets/dhanvi.jpg';
import portfolioImg from '../assets/harshportfolio.jpg';
import mrsImg from '../assets/mrs.jpg';
import namoImg from '../assets/namo.jpg';

// --- DATA ---
const projects = [
  { 
    id: 1, 
    title: "AGJ DATA INFOTECH", 
    category: "Company Profile Website", 
    img: agjImg, 
    link: "https://agjdatainfotech.com",
  },
  { 
    id: 2, 
    title: "Namo Production Logo", 
    category: "Brand Identity", 
    img: logoImg, 
    // link: "/projects/techstart", 
  },
  { 
    id: 3, 
    title: "Dhanvi Trendx", 
    category: "Ecommerce", 
    img: dhanviImg, 
    link: "https://dhanvitrendz.in",
  },
  { 
    id: 4, 
    title: "Portfolio", 
    category: "Portfolio Website", 
    img: portfolioImg, 
    link: "https://harshjainportfolio.netlify.app/",
  },
  { 
    id: 5, 
    title: "Mrs Cutlery", 
    category: "Company Catalog", 
    img: mrsImg, 
    link: "https://mrscutlery.vercel.app/",
  },
  { 
    id: 6, 
    title: "Namo Production", 
    category: "Company Profile Website", 
    img: namoImg, 
    link: "https://lazyboyharsh.github.io/namo-production/index.html",
  },
];

const Portfolio = () => {

  // --- SEO OPTIMIZATION ---
  useEffect(() => {
    document.title = "Our Work | LazyWorkz Portfolio";
    const metaDesc = document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Explore our portfolio of high-performance websites, brand identities, and ecommerce solutions delivered by LazyWorkz.";
    document.head.appendChild(metaDesc);
    return () => { document.head.removeChild(metaDesc); };
  }, []);

  return (
    <div className="pt-16 w-full overflow-x-hidden font-sans bg-gray-50 min-h-screen">
      
      {/* HEADER */}
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

      {/* PORTFOLIO GRID */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.a 
                key={project.id}
                href={project.link}
                target="_blank"             
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Container */}
                {/* h-72 gives enough height. bg-gray-100 creates a nice frame for logos */}
                <div className="h-72 overflow-hidden relative bg-gray-100 p-4 flex items-center justify-center">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    loading={index < 2 ? "eager" : "lazy"} 
                    decoding="async"
                    // --- FIX IS HERE ---
                    // object-contain: Force the WHOLE image to fit inside the box
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow border-t border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-1 rounded-md">
                      {project.category}
                    </span>
                    <ExternalLink size={18} className="text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                    View Project <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </motion.a>
            ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gray-900 text-center mt-12 relative overflow-hidden">
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-orange-500/5 blur-3xl rounded-full pointer-events-none"></div>

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