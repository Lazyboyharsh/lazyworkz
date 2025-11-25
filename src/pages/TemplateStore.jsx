import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Bell, ArrowLeft, CheckCircle, Layers, Code, Zap } from 'lucide-react';

const TemplateStore = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center text-gray-400 hover:text-white transition-colors z-20">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back Home
      </Link>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        
        {/* Animated Icon */}
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-orange-500/30"
        >
          <Rocket className="w-12 h-12 text-white" />
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-orange-400 text-sm font-bold mb-6 uppercase tracking-wider">
            Coming Soon
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
            Premium Templates. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Lazy Prices.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We are building a library of high-converting, pre-built React templates. Stop coding from scratch and start selling.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center px-5 py-2 bg-gray-800 rounded-full border border-gray-700 text-gray-300">
            <Layers className="w-4 h-4 mr-2 text-blue-400" /> Fully Responsive
          </div>
          <div className="flex items-center px-5 py-2 bg-gray-800 rounded-full border border-gray-700 text-gray-300">
            <Code className="w-4 h-4 mr-2 text-green-400" /> Clean Code
          </div>
          <div className="flex items-center px-5 py-2 bg-gray-800 rounded-full border border-gray-700 text-gray-300">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" /> Fast Loading
          </div>
        </motion.div>

        {/* Email Capture Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          {isSubscribed ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/50 rounded-2xl p-6 flex flex-col items-center text-green-400"
            >
              <CheckCircle className="w-12 h-12 mb-3" />
              <h3 className="font-bold text-xl">You're on the list!</h3>
              <p className="text-sm text-green-300/80">We'll verify your email and notify you when we launch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex bg-gray-900 rounded-2xl p-2 border border-gray-700 focus-within:border-orange-500/50 transition-colors">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-3 focus:outline-none"
                  required
                />
                <button 
                  type="submit"
                  className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-all flex items-center flex-shrink-0"
                >
                  Notify Me <Bell className="w-4 h-4 ml-2" />
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                No spam. Just one email when we launch.
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default TemplateStore;