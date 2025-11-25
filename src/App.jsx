import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import TemplateStore from './pages/TemplateStore'; // FIXED: Renamed from Portfolio to prevent duplicate
import ScrollToTop from './components/Scrolltotop';
import Contact from './pages/contact';

function App() {
  return (
    <div className="font-sans text-gray-700 flex flex-col min-h-screen">
      {/* ScrollToTop handles scrolling up when changing pages */}
      <ScrollToTop /> 

      <Navbar />      
      {/* flex-grow ensures the footer stays at the bottom even on empty pages */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Portfolio />} />
          {/* Added a route for TemplateStore if you need it, otherwise remove this line */}
          <Route path="/templates" element={<TemplateStore />} /> 
          <Route path="/contact" element={<Contact />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-gray-500">We were too lazy to make this page.</p>
            </div>
          } />
        </Routes>
      </main>

      {/* The New Footer Component */}
      <Footer /> 
    </div>
  );
}

export default App;