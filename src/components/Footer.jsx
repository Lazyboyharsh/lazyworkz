import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      {/* Top Section: 4 Columns */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Lazy Workz</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We build high-quality digital solutions with a focus on efficiency and calm execution. No rush, just results.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social Icons (SVGs to avoid external deps) */}
              <a href="#" className="hover:text-primary transition-colors"><SocialIcon path="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></a>
              <a href="#" className="hover:text-primary transition-colors"><SocialIcon path="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></a>
              <a href="#" className="hover:text-primary transition-colors"><SocialIcon path="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services & Pricing</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Our Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">What We Do</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Stay Relaxed</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest tech tips sent to your inbox. No spam, we promise.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-primary text-white px-4 py-2 rounded font-bold hover:bg-orange-600 transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2025 LazyWorkz. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Tiny Helper Component for Icons
const SocialIcon = ({ path }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d={path} />
  </svg>
);

export default Footer;