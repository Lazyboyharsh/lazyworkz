import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Store', path: '/store', isSpecial: true },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* 1. LOGO (Always Visible) */}
        <Link to="/" className="flex-shrink-0 flex items-center z-50 font-extrabold text-2xl text-gray-900 tracking-tight" onClick={closeMenu}>
          Lazy<span className="text-orange-600">Workz</span>
        </Link>
        
        {/* 2. DESKTOP MENU (Hidden on mobile/tablet, Visible on Large screens) */}
        {/* Changed 'md:flex' to 'lg:flex' for better spacing on tablets */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="relative py-2 group"
            >
              <span className={`font-medium text-sm xl:text-base transition-colors ${location.pathname === link.path ? 'text-orange-600' : 'text-gray-600 group-hover:text-orange-600'}`}>
                {link.name}
                {/* {link.isSpecial && (
                  <span className="absolute -top-3 -right-4 bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 rounded-md border border-orange-200">
                    NEW
                  </span>
                )} */}
              </span>
              
              {/* Animated Underline */}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" 
                />
              )}
            </Link>
          ))}
        </div>

        {/* 3. DESKTOP BUTTON & HAMBURGER WRAPPER */}
        <div className="flex items-center gap-4">
            
           {/* CTA Button (Hidden on mobile, visible on lg screens) */}
           <div className="hidden lg:block">
             <Link to="/contact" className="bg-gray-900 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-orange-600 transition-colors shadow-md whitespace-nowrap">
               Hire Us
             </Link>
           </div>
        
           {/* Hamburger Button (Visible on mobile/tablet, hidden on lg screens) */}
           <button 
             onClick={() => setIsOpen(!isOpen)} 
             className="lg:hidden text-gray-800 hover:text-orange-600 focus:outline-none z-50 p-1"
           >
             {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
           </button>
        </div>

      </nav>
      
      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={closeMenu}
                  className={`
                    flex items-center justify-between px-4 py-4 rounded-xl font-bold transition-colors
                    ${location.pathname === link.path 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <span className="flex items-center text-lg">
                    {link.name === 'Store' && <ShoppingBag className="w-5 h-5 mr-3" />}
                    {link.name}
                  </span>
                  {link.isSpecial && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                  )}
                </Link>
              ))}
              
              <Link 
                to="/contact"
                onClick={closeMenu}
                className="mt-4 block text-center w-full bg-gray-900 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
              >
                Hire Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;