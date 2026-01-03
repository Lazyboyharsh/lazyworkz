import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { 
  Monitor, PenTool, BarChart3, ArrowRight, Check, Code2, Globe, Zap, 
  Cpu, Rocket, Layers, Clock, Star
} from 'lucide-react';

const PRIMARY_COLOR_CLASSES = "from-orange-500 to-orange-600";

// --- ANIMATION VARIANTS (Only for below-the-fold content) ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- OPTIMIZED BACKGROUND (Fast on Mobile) ---
const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white">
    
    {/* 1. MOBILE: Static Gradient (Zero Lag) */}
    <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-white to-white md:hidden"></div>

    {/* 2. DESKTOP: Animated Blobs (Hidden on Mobile) */}
    <div className="hidden md:block">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-orange-100/50 rounded-full blur-[80px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-purple-100/40 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
    </div>

    {/* Grid Pattern (Lightweight) */}
    <div className="absolute inset-0 opacity-[0.03]" 
         style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>

    <style>{`
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob { animation: blob 7s infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
    `}</style>
  </div>
);

const TechMarquee = () => {
  const techs = [
    { name: "React JS", icon: <Code2 size={18} /> },
    { name: "Python", icon: <Cpu size={18} /> },
    { name: "Tailwind", icon: <Zap size={18} /> },
    { name: "Node.js", icon: <Globe size={18} /> },
    { name: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="w-full bg-white border-y border-gray-100 py-6 overflow-hidden relative z-20">
      {/* 'will-change-transform' helps mobile GPU handle scrolling smoothly */}
      <div className="flex gap-16 items-center animate-scroll whitespace-nowrap w-max will-change-transform">
        {[...techs, ...techs, ...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-wider text-sm">
            {tech.icon} {tech.name}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; }
      `}</style>
    </div>
  );
};

/* --- MAIN PAGE --- */
const Home = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', website: '' });

  // --- SEO METADATA ---
  useEffect(() => {
    document.title = "LazyWorkz – High Performance Websites & Digital Growth";
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "LazyWorkz builds high-performance websites, SEO, and branding solutions that turn clicks into revenue.";
    document.head.appendChild(metaDesc);
    return () => document.head.removeChild(metaDesc);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "3ba0f05a-b567-4edd-8985-ffdabe341542",
          subject: "New Free Audit Request",
          from_name: "LazyWorkz Audit Form",
          ...formData
        }),
      });
      setFormStatus('success');
      setFormData({ name: '', email: '', website: '' });
    } catch (error) { setFormStatus('error'); }
    setTimeout(() => { if(formStatus !== 'success') setFormStatus('idle') }, 3000);
  };

  return (
    <div className="pt-16 w-full overflow-x-hidden min-h-screen font-sans text-gray-900 bg-white">

      {/* 1. HERO SECTION - LCP OPTIMIZED (Static Text) */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto px-6 relative z-10 pt-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content - Static HTML for instant Paint */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Accepting New Projects
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Turn Clicks Into <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${PRIMARY_COLOR_CLASSES}`}>
                  Revenue.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Stop losing leads to a slow website. We build high-performance digital experiences that scale your business automatically.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                 <Link to="/services" className="px-8 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                   View Pricing
                 </Link>
              </div>
            </div>

            {/* Right Form - Animation is okay here */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md mx-auto lg:mr-0"
            >
              <div className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000`}></div>
                
                {/* LAG FIX: Removed backdrop-blur-xl on mobile. 
                   Mobile: Solid white background (Fast).
                   Desktop: Glass effect (Beautiful).
                */}
                <div className="relative bg-white md:bg-white/80 md:backdrop-blur-xl border border-gray-100 md:border-white/80 p-8 rounded-2xl shadow-2xl">
                   {formStatus === 'success' ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><Check size={32} /></div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <button onClick={() => setFormStatus('idle')} className="mt-6 text-orange-600 underline">Send another</button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Get a Free Audit</h3>
                      <p className="text-gray-500 mb-6 text-sm">We'll analyze your digital presence for free.</p>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                        <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                        <input type="url" id="website" value={formData.website} onChange={handleChange} placeholder="Website URL (Optional)" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                        <button type="submit" disabled={formStatus === 'submitting'} className={`w-full bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} text-white font-bold py-4 rounded-xl shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 transition-all`}>
                          {formStatus === 'submitting' ? 'Processing...' : <>Claim Audit <ArrowRight size={18} /></>}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TechMarquee />

      {/* 2. SERVICES SECTION - Animation Enabled */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-orange-600 uppercase font-bold text-xs tracking-widest mb-3">What We Do</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Full-Service Digital Growth</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Modern Websites", desc: "Blazing fast React & Next.js websites.", icon: <Monitor />, color: "text-blue-600", bg: "bg-blue-50" },
              { title: "Logo & Branding", desc: "Memorable visual identities that stick.", icon: <PenTool />, color: "text-purple-600", bg: "bg-purple-50" },
              { title: "SEO & Analysis", desc: "Data-driven strategies to rank higher.", icon: <BarChart3 />, color: "text-green-600", bg: "bg-green-50" }
            ].map((s, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-6`}>{s.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 mb-6">{s.desc}</p>
                <Link to="/services" className="flex items-center text-sm font-bold text-gray-900 hover:text-orange-600">Learn more <ArrowRight size={16} className="ml-1" /></Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
               <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Why businesses trust <span className="text-orange-600">LazyWorkz</span></h2>
               <p className="text-lg text-gray-500 mb-8">We don't just write code; we solve business problems. Our focus is on ROI, speed, and scalability.</p>
               
               <div className="space-y-6">
                 {[
                   { title: "Lightning Fast Delivery", desc: "Most projects delivered in under 1 weeks.", icon: <Rocket size={20} /> },
                   { title: "24/7 Dedicated Support", desc: "We are always here when you need us.", icon: <Clock size={20} /> },
                   { title: "Scalable Architecture", desc: "Built to handle millions of users.", icon: <Layers size={20} /> }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                     <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">{item.icon}</div>
                     <div>
                       <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                       <p className="text-sm text-gray-500">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              className="bg-gray-900 text-white rounded-3xl p-10 lg:p-14 relative"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10"><Code2 size={100} /></div>
              <h3 className="text-3xl font-bold mb-6">Ready to Scale?</h3>
              <p className="text-gray-400 mb-8 text-lg">We Optimize. You Grow.</p>
              <div className="grid grid-cols-2 gap-8 border-t border-gray-700 pt-8">
                 <div><div className="text-4xl font-bold text-orange-500 mb-1">90%</div><div className="text-sm text-gray-400">Client Retention</div></div>
                 <div><div className="text-4xl font-bold text-orange-500 mb-1">50+</div><div className="text-sm text-gray-400">Projects Done</div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">How We Work</h2>
            <p className="text-gray-500">Simple, transparent, and effective.</p>
          </motion.div>

          <div className="relative grid md:grid-cols-4 gap-8">
             <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
             {[
               { step: "01", title: "Discovery", desc: "We learn about your goals." },
               { step: "02", title: "Strategy", desc: "We plan the perfect solution." },
               { step: "03", title: "Development", desc: "We build with clean code." },
               { step: "04", title: "Launch", desc: "We go live and optimize." }
             ].map((item, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 20 }} 
                 whileInView={{ opacity: 1, y: 0 }} 
                 viewport={{ once: true }} 
                 transition={{ delay: i * 0.2 }}
                 className="relative z-10 text-center bg-gray-50"
               >
                 <div className="w-16 h-16 mx-auto bg-white border-4 border-orange-500 text-gray-900 font-bold text-xl rounded-full flex items-center justify-center mb-6 shadow-lg">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                 <p className="text-sm text-gray-500 px-4">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} 
            className="text-3xl font-extrabold text-center mb-16"
          >
            What People Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Vikram Mehta",
                review: "LazyWorkz ne game change kar diya! The website is butter smooth and the design is exactly what I wanted. Best part is their support team—hamesha available rehte hain."
              },
              {
                name: "Anjali Gupta",
                review: "Honestly, finding a reliable agency is hard, but these guys are genuine. Kaam time pe deliver kiya aur koi hidden charges nahi. Super satisfied with the new landing page!"
              },
              {
                name: "Rohan Desai",
                review: "Professionalism at its peak. They understood our requirements perfectly. Website load speed ab kaafi fast hai. If you want quality work in a budget, go for them."
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-orange-400 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} fill="currentColor" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.review}"</p>
                </div>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Let's Build Something Great.</h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">Don't settle for average. Get a website that performs as good as it looks.</p>
            <Link to="/contact" className="inline-block bg-white text-orange-600 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:bg-gray-100 hover:scale-105 transition-all">
              Start Your Project
            </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;