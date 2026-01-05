import { useEffect } from 'react'; 
import { Routes, Route, useLocation } from 'react-router-dom'; 

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import TemplateStore from './pages/TemplateStore';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Blog from './pages/Blog';        // <--- NEW
import BlogPost from './pages/BlogPost'; // <--- NEW

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="font-sans text-gray-700 flex flex-col min-h-screen">
      
      <Navbar />      
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          
          {/* Projects Page */}
          <Route path="/projects" element={<Portfolio />} />
          
          {/* Store Page */}
          <Route path="/store" element={<TemplateStore />} /> 
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />           {/* <--- NEW */}
          <Route path="/blog/:id" element={<BlogPost />} />   {/* <--- NEW */}

          <Route path="/contact" element={<Contact />} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<Legal title="Privacy Policy" lastUpdated="Jan 01, 2026" />} />
          <Route path="/terms" element={<Legal title="Terms of Service" lastUpdated="Jan 01, 2026" />} />
          <Route path="/sitemap" element={<Legal title="Sitemap" lastUpdated="Jan 01, 2026" />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="h-[80vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
              <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
              <p className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</p>
              <p className="text-gray-500 mt-2">We were too lazy to make this page.</p>
            </div>
          } />
        </Routes>
      </main>

      <Footer /> 
    </div>
  );
}

export default App;