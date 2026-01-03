import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Hammer } from 'lucide-react';

const TemplateStore = () => {

  // --- SEO ---
  useEffect(() => {
    document.title = "Coming Soon | LazyWorkz";
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      
      {/* 1. Icon Container (Light Background) */}
      <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-orange-500/10 border border-orange-100">
        <Rocket className="text-orange-600 w-12 h-12" />
      </div>

      {/* 2. Main Heading (Dark Text) */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Something Great <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
          Is Coming.
        </span>
      </h1>

      {/* 3. Subtext (Gray Text) */}
      <p className="text-gray-500 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
        We are currently building a library of high-performance React templates. 
        Check back soon for the launch.
      </p>

      {/* 4. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/25"
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <Link 
          to="/contact"
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold border border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all"
        >
          <Hammer size={18} /> Request Custom Build
        </Link>
      </div>

    </div>
  );
};

export default TemplateStore;