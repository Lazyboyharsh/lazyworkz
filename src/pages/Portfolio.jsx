import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

// 1. IMPORT YOUR IMAGES HERE
// Make sure your images are in the 'src/assets' folder!
import agjImg from '../assets/agj.jpg';  // Adjust path if needed
import logoImg from '../assets/logo.png';
import dhanviImg from '../assets/dhanvi.jpg';
import portfolioImg from '../assets/harshportfolio.jpg';
import mrsImg from '../assets/mrs.jpg';
import namoImg from '../assets/namo.jpg';

const Portfolio = () => {

  const projects = [
    { 
      id: 1, 
      title: "AGJ DATA INFOTECH", 
      category: "Company Profile Website", 
      type: "Web", 
      img: agjImg, // Use the imported variable name, not a string
      link: "https://agjdatainfotech.com",
      className: "md:col-span-2 md:row-span-2" 
    },
    { 
      id: 2, 
      title: "Namo Production Logo", 
      category: "Brand Identity", 
      type: "Branding", 
      img: logoImg, 
      link: "/projects/techstart",
      className: "md:col-span-2" 
    },
    { 
      id: 3, 
      title: "Dhanvi Trendx", 
      category: "Ecommerce", 
      type: "Web", 
      img: dhanviImg, 
      link: "https://dhanvitrendz.in",
      className: "md:col-span-1" 
    },
    { 
      id: 4, 
      title: "Portfolio", 
      category: "Portfolio website", 
      type: "Data", 
      img: portfolioImg, 
      link: "https://harshjainportfolio.netlify.app/",
      className: "md:col-span-1" 
    },
    { 
      id: 5, 
      title: "Mrs", 
      category: "Company Catalog", 
      type: "Data", 
      img: mrsImg, 
      link: "https://mrscutlery.vercel.app/",
      className: "md:col-span-2" 
    },
    { 
      id: 6, 
      title: "Namo", 
      category: "Company Profile website", 
      type: "Web", 
      img: namoImg, 
      link: "https://lazyboyharsh.github.io/namo-production/index.html",
      className: "md:col-span-2" 
    },
  ];

  return (
    <div className="pt-16 w-full overflow-x-hidden font-sans bg-gray-50 min-h-screen">
      
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

      <section className="container mx-auto px-4 py-12">
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
                className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-gray-200 ${project.className}`}
              >
                {/* Use the img variable directly */}
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                
                {/* Mobile: Visible (opacity-60), Desktop: Hidden (md:opacity-0) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 opacity-60 md:opacity-0 md:group-hover:opacity-90" />

                {/* Mobile: Visible (opacity-100), Desktop: Hidden (md:opacity-0) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 p-6 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  
                  <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-3 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                    {project.category}
                  </span>
                  
                  <h3 className="text-white text-3xl font-bold mb-6 text-center transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.title}
                  </h3>

                  <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 hover:bg-orange-500 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </span>
                  </div>

                </div>
              </motion.a>
            ))}
        </div>
      </section>

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