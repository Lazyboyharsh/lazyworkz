import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Portfolio = () => {

  const projects = [
    { 
      id: 1, 
      title: "AGJ DATA INFOTECH", 
      category: "Company Profile Website", 
      type: "Web", 
      img: "/images/projects/agj.jpg", 
      link: "https://agjdatainfotech.com",
      // BIG SQUARE (2x2) - The "Hero" project
      className: "md:col-span-2 md:row-span-2" 
    },
    { 
      id: 2, 
      title: "TechStart Logo", 
      category: "Brand Identity", 
      type: "Branding", 
      img: "/images/projects/logo.png", 
      link: "/projects/techstart",
      // WIDE RECTANGLE (2 columns wide)
      className: "md:col-span-2" 
    },
    { 
      id: 3, 
      title: "Dhanvi Trendx", 
      category: "Ecommerce", 
      type: "Web", 
      img: "/images/projects/dhanvi.jpg", 
      link: "https://dhanvitrendz.in",
      // SMALL SQUARE (Standard)
      className: "md:col-span-1" 
    },
    { 
      id: 4, 
      title: "Portfolio", 
      category: "Portfolio website", 
      type: "Data", 
      img: "/images/projects/harshportfolio.jpg", 
      link: "https://harshjainportfolio.netlify.app/",
      // SMALL SQUARE (Standard)
      className: "md:col-span-1" 
    },
    { 
      id: 5, 
      title: "Mrs", 
      category: "Company Catalog", 
      type: "Data", 
      img: "/images/projects/mrs.jpg", 
      link: "https://mrscutlery.vercel.app/",
      // WIDE RECTANGLE
      className: "md:col-span-2" 
    },
    { 
      id: 6, 
      title: "Namo", 
      category: "Company Profile website", 
      type: "Web", 
      img: "/images/projects/namo.jpg", 
      link: "https://lazyboyharsh.github.io/namo-production/index.html",
      // WIDE RECTANGLE
      className: "md:col-span-2" 
    },
  ];

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

      {/* 2. PROJECT GRID */}
      <section className="container mx-auto px-4 py-12">
        {/* GRID CONFIGURATION:
            1. grid-cols-1: Mobile (1 column stack)
            2. md:grid-cols-4: Desktop (4 columns allow for 2x2, 2x1, 1x1 layouts)
            3. auto-rows-[300px]: Sets a fixed height for every row, ensuring alignment.
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
            {projects.map((project, index) => (
              <motion.a 
                key={project.id}
                href={project.link}
                target="_blank"             
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                // We combine the project's specific sizing class with the base styles
                className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-gray-200 ${project.className}`}
              >
                {/* Image fills the container height/width exactly */}
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 z-10">
                  
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
              </motion.a>
            ))}
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-24 bg-gray-900 text-center mt-12 relative overflow-hidden">
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