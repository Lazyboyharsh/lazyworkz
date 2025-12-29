import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Define a consistent theme primary color for Tailwind utility classes
const PRIMARY_COLOR_CLASSES = "from-orange-500 to-orange-600";

/* --- 🌟 HELPER: ANIMATED NUMBER COUNTER (Enhanced) 🌟 --- */
const Counter = ({ target, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const animateCount = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let start = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const increment = target / (duration / frameRate);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [target]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, animateCount]);

  return (
    <div ref={ref} className="text-center p-6 transform transition hover:scale-[1.02] duration-300">
      <div
        className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} mb-2`}
        aria-label={`${label}: ${count} ${suffix}`}
        role="status"
      >
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 font-medium text-sm tracking-widest uppercase">{label}</p>
    </div>
  );
};

Counter.propTypes = {
  target: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

// Helper to determine the icon based on a simple type string
const getIconClass = (type) => {
  switch (type) {
    case 'websites':
      return { icon: "fas fa-laptop-code", bg: "bg-orange-100", text: "text-orange-600" };
    case 'branding':
      return { icon: "fas fa-pen-nib", bg: "bg-purple-100", text: "text-purple-600" };
    case 'data':
      return { icon: "fas fa-chart-line", bg: "bg-green-100", text: "text-green-600" };
    default:
      return { icon: "fas fa-cog", bg: "bg-gray-100", text: "text-gray-600" };
  }
};

/* --- MAIN HOME PAGE (Enhanced) --- */
const Home = () => {
  // Form State
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Web3Forms Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const ACCESS_KEY = "3ba0f05a-b567-4edd-8985-ffdabe341542"; // Your Web3Forms Key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:"3ba0f05a-b567-4edd-8985-ffdabe341542",
          subject: "New Free Audit Request",
          from_name: "LazyWorkz Audit Form",
          ...formData
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', website: '' }); // Clear form
      } else {
        console.error("Form submission error:", result);
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Network error:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  // Centralized Scroll Animation Logic
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Modern Websites",
      description: "Fast, responsive websites built with React and optimized frameworks. We ensure your site loads instantly and looks great on all devices.",
      image: "images/website-design.jpg",
      alt: "Man coding on a laptop",
      type: "websites",
      delay: "delay-0",
    },
    {
      title: "Logo & Branding",
      description: "Your logo is your face. We design memorable visual identities that stick in your customer's mind and define your market presence.",
      image: "images/logo-design.jpg",
      alt: "Graphic design tools on a desk",
      type: "branding",
      delay: "delay-150",
    },
    {
      title: "SEO & Data Analysis",
      description: "We analyze your traffic and optimize your content to help you rank higher on search engines. Our strategies deliver data-driven growth.",
      image: "images/analysis-design.jpg",
      alt: "Data dashboards and charts",
      type: "data",
      delay: "delay-300",
    },
  ];

  return (
    <div className="pt-16 w-full overflow-x-hidden min-h-screen font-sans" role="main">

      {/* 1. HERO SECTION (White Background Version) */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden" aria-labelledby="hero-title">

        {/* Abstract Background Gradients (Softer for white bg) */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column: Text */}
            <div className="reveal animate-fade-in-up text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold mb-8 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Agency for Growth
              </div>

              <h1 id="hero-title" className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                Turn Clicks Into <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${PRIMARY_COLOR_CLASSES}`}>
                  Paying Customers.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Stop losing leads to a slow website. We build high-performance digital experiences that scale your business.
              </p>

              <div className="hidden lg:flex items-center gap-4 text-gray-500 text-sm font-medium">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="Client" />
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="Client" />
                  <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="Client" />
                </div>
                <p>Trusted by 50+ businesses</p>
              </div>
            </div>

            {/* Right Column: White Card Form */}
            <div className="reveal animate-fade-in-down delay-200 w-full max-w-md mx-auto lg:mr-0">
              <div className="relative group">
                {/* Decoration behind form */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`}></div>

                <div className="relative bg-white border border-gray-100 p-8 rounded-2xl shadow-2xl">
                  {formStatus === 'success' ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        <i className="fas fa-check"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-500">We'll be in touch within 24 hours.</p>
                      <button onClick={() => setFormStatus('idle')} className="mt-6 text-orange-600 font-medium hover:text-orange-700">Send another</button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Get a Free Audit</h3>
                      <p className="text-gray-500 mb-6 text-sm">Fill out the form below and we'll analyze your current digital presence for free.</p>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="sr-only">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="sr-only">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="website" className="sr-only">Website URL (Optional)</label>
                          <input
                            type="url"
                            id="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="Website URL (if you have one)"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all placeholder-gray-400"
                          />
                        </div>
                        
                        {/* Error Message Display */}
                        {formStatus === 'error' && (
                          <div className="text-red-500 text-sm text-center">
                            Something went wrong. Please try again later.
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className={`w-full bg-gradient-to-r ${PRIMARY_COLOR_CLASSES} text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                          {formStatus === 'submitting' ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Claim Your Free Audit <i className="fas fa-arrow-right"></i>
                            </>
                          )}
                        </button>
                        <p className="text-xs text-gray-400 text-center mt-4">
                          No spam. Unsubscribe anytime.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ANIMATED STATS BAR */}
      <div className="bg-black py-12 border-y border-gray-800" aria-label="Our key performance statistics">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white gap-y-8">
            <Counter target={15} label="Projects Shipped" suffix="+" />
            <Counter target={100} label="Client Satisfaction" suffix="%" />
            <Counter target={4} label="Response Time" suffix="Hrs" />
            <Counter target={0} label="Missed Deadlines" />
          </div>
        </div>
      </div>

      {/* 3. SERVICES (Fixed Image Fit) */}
      <section className="py-24 bg-white" aria-labelledby="services-heading">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal animate-fade-in-up">
            <p className="text-orange-600 uppercase font-semibold text-sm tracking-wider mb-2">Our Expertise</p>
            <h2 id="services-heading" className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Focusing on What Matters</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">We focus on these three pillars to drive measurable, long-term growth for your business.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-start">
            {services.map((service, index) => {
              const { icon, bg, text } = getIconClass(service.type);
              return (
                <div
                  key={index}
                  className={`reveal group bg-white rounded-xl shadow-lg border-t-4 border-orange-500 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up ${service.delay}`}
                >
                  <div className="w-full overflow-hidden bg-gray-50">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-8">
                    <div className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center ${text} text-2xl mb-4 transition-transform duration-300 group-hover:rotate-6`}>
                      <i className={icon}></i>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-16 reveal">
            <Link to="/services" className="text-orange-600 font-semibold text-lg hover:text-orange-700 transition-colors inline-flex items-center group">
              View All Services
              <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;