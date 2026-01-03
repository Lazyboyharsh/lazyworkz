import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Legal = ({ title, lastUpdated }) => {
  
  useEffect(() => {
    document.title = `${title} | LazyWorkz`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-500 text-sm">Last Updated: {lastUpdated}</p>
        </div>

        {/* Placeholder Content - You can replace this later */}
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p>
            Welcome to LazyWorkz. This is a generic placeholder for the <strong>{title}</strong>. 
            Because we believe in "Productive Laziness", we haven't written the full legal jargon yet.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h3>
          <p>
            By accessing our website, you agree to be bound by these terms. If you disagree with any part of the terms, 
            then you may not access the service.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Usage</h3>
          <p>
            We reserve the right to withdraw or amend our service without notice. We will not be liable if for any reason 
            our site is unavailable at any time or for any period.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Contact Us</h3>
          <p>
            If you have any questions about this page, please contact us at: <br/>
            <span className="font-bold text-orange-600">notalazy865@gmail.com</span>
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link to="/" className="text-orange-600 font-bold hover:underline">
            &larr; Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Legal;