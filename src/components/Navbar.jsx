import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  // --- NEW: Refs for Click Outside Logic ---
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NEW: Handle Click Outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open, AND click is NOT in menu, AND click is NOT on the toggle button
      if (
        isOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ];

  // Animation Variants
  const menuVariants = {
    closed: { 
      scale: 0.9, 
      opacity: 0,
      transition: { delay: 0.15 }
    },
    open: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { delay: i * 0.1 } 
    })
  };

  return (
    <>
      {/* --- DESKTOP & MOBILE FLOATING NAV --- */}
      <motion.header 
        className={`fixed z-50 left-0 right-0 transition-all duration-300 ease-in-out ${
          scrolled ? 'top-4' : 'top-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-center">
          <motion.nav 
            layout
            className={`
              relative flex items-center justify-between 
              bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5
              rounded-full transition-all duration-300
              ${scrolled ? 'w-[90%] md:w-[70%] py-3 px-6' : 'w-[95%] md:w-[85%] py-4 px-8'}
            `}
          >
            
            {/* 1. LOGO (Text Only) */}
            <Link to="/" className="flex items-center z-50 group" onClick={() => setIsOpen(false)}>
              <span className="font-extrabold text-2xl tracking-tighter text-gray-900 transition-all group-hover:opacity-80">
                Lazy<span className="text-orange-600">Workz</span>
              </span>
            </Link>

            {/* 2. DESKTOP LINKS (Sliding Background Animation) */}
            <div className="hidden lg:flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-full border border-gray-100">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => setHoveredPath(link.path)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className={`
                      relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10
                      ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}
                    `}
                  >
                    {/* The Sliding Background Pill */}
                    {hoveredPath === link.path && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {/* Active State Dot */}
                    {isActive && (
                      <motion.span layoutId="active-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* 3. ACTIONS */}
            <div className="flex items-center gap-3">
               <Link 
                to="/contact" 
                className="hidden lg:flex items-center gap-2 bg-gray-900 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-lg shadow-gray-200"
              >
                Hire Us <ArrowRight size={14} />
               </Link>

               {/* Mobile Toggle - Attached buttonRef here */}
               <button 
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
               >
                 {isOpen ? <X size={20} /> : <Menu size={20} />}
               </button>
            </div>

          </motion.nav>
        </div>
      </motion.header>

      {/* --- MOBILE FULL SCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/60 pt-32 px-6 lg:hidden"
          >
             {/* Attached menuRef here - Clicking outside this DIV closes the menu */}
             <motion.div 
               ref={menuRef}
               variants={menuVariants}
               initial="closed"
               animate="open"
               exit="closed"
               className="bg-white border border-white/40 shadow-2xl rounded-[32px] p-6 max-w-lg mx-auto overflow-hidden"
             >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div custom={i} variants={itemVariants} key={link.name}>
                       <Link
                         to={link.path}
                         onClick={() => setIsOpen(false)}
                         className={`
                           group flex items-center justify-between p-4 rounded-2xl transition-all
                           ${location.pathname === link.path 
                             ? 'bg-orange-50 text-orange-600' 
                             : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'}
                         `}
                       >
                         <span className="text-xl font-bold flex items-center gap-3">
                           {link.name === 'Store' && <ShoppingBag size={20} />}
                           {link.name}
                         </span>
                         <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-5 group-hover:0 transition-all ${location.pathname === link.path ? 'opacity-100 translate-x-0' : ''}`} />
                       </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div custom={6} variants={itemVariants} className="pt-6 mt-4 border-t border-gray-100">
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-xl active:scale-95 transition-transform">
                      Start Project <RocketIcon />
                    </Link>
                  </motion.div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper icon component
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
)

export default Navbar;