import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, ArrowRight, Sparkles, AlertCircle, X, Loader2 } from 'lucide-react';

// --- DATA CONFIGURATION ---
const plans = [
  {
    name: 'Portfolio Website',
    desc: 'Perfect for personal brands, freelancers & resumes.',
    price: '₹2,999',
    period: '/one-time',
    features: [
      'Professional Single Page/Multi-section',
      'Mobile Responsive Design',
      'Contact Form Integration',
      'Social Media Links',
      'Fast Loading Speed'
    ],
    cta: 'Get Portfolio',
    isPopular: false,
    delay: 0.1,
  },
  {
    name: 'Company Profile',
    desc: 'Establish a strong digital presence for your business.',
    price: '₹4,999',
    period: '/one-time',
    features: [
      '4-6 Pages Website',
      'Mobile Responsive Layout',
      'Business Inquiry Form',
      'Google Maps Integration',
      'WhatsApp Chat Button',
      'Gallery & Testimonials'
    ],
    cta: 'Choose Business',
    isPopular: true,
    delay: 0.2,
  },
  {
    name: 'E-commerce Store',
    desc: 'Start selling your products online 24/7.',
    price: '₹19,999',
    period: '/starting',
    features: [
      'Complete Product Management',
      'Payment Gateway Integration',
      'Shopping Cart & Checkout',
      'Admin Dashboard',
      'User Accounts',
      'Order Management System'
    ],
    cta: 'Start Selling',
    isPopular: false,
    delay: 0.3,
  },
  {
    name: 'Logo & Branding',
    desc: 'Stand out with a unique visual identity.',
    price: '₹3,999',
    period: '/package',
    features: [
      '3 Unique Logo Concepts',
      'Vector Source Files (AI, EPS, SVG)',
      'High-Res PNG & JPG',
      'Color Palette Selection',
      'Typography Usage Guide',
      'Social Media Kit'
    ],
    cta: 'Get Designed',
    isPopular: false,
    delay: 0.4,
  },
  {
    name: 'Data Analytics',
    desc: 'Understand your traffic and grow faster.',
    price: '₹4,999',
    period: '/monthly',
    features: [
      'Google Analytics 4 Setup',
      'Monthly Traffic Reports',
      'User Behavior Heatmaps',
      'Conversion Rate Optimization',
      'Competitor Analysis',
      'SEO Keyword Tracking'
    ],
    cta: 'Start Analyzing',
    isPopular: false,
    delay: 0.5,
  },
  {
    name: 'Custom Build',
    desc: 'Tailored solutions for complex requirements.',
    price: "Let's Discuss",
    period: '',
    features: [
      'Custom Web Applications',
      'API Integrations',
      'SaaS Development',
      'Complex Databases',
      'Scalable Architecture',
      'Dedicated Support'
    ],
    cta: 'Contact Us',
    isPopular: false,
    delay: 0.6,
  },
];

const faqs = [
  {
    question: 'Is Hosting and Domain included in these prices?',
    answer: 'No, Domain and Hosting charges are separate. We can help you purchase them, or you can provide your own credentials if you already have them.',
  },
  {
    question: 'How long does the Company Profile website take?',
    answer: 'A standard 5-10 page Company Profile website is typically delivered within 5-7 working days, provided all content (images/text) is available.',
  },
  {
    question: 'Do you offer maintenance for E-commerce sites?',
    answer: 'Yes! While the build cost is one-time, we offer separate maintenance packages to handle product updates, security patches, and backups for your online store.',
  },
  {
    question: 'Can I order just a Logo Design?',
    answer: 'Absolutely. The Logo & Branding package is a standalone service. You do not need to purchase a website to get a logo designed.',
  },
];

// --- SUB-COMPONENT: FAQ ITEM ---
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-600'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400 group-hover:bg-orange-50'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: CONTACT MODAL ---
const ContactModal = ({ plan, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.target);
    formData.append("access_key", "3ba0f05a-b567-4edd-8985-ffdabe341542");
    formData.append("subject", `New Inquiry: ${plan?.name || 'General Inquiry'}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult('success');
        e.target.reset();
      } else {
        setResult('error');
      }
    } catch (error) {
      setResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // LAG FIX: Using standard backdrop-blur-sm (lightweight)
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-orange-50 to-white px-8 py-6 border-b border-orange-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Get Started</h3>
            <p className="text-sm text-gray-500 mt-1">Inquiry for <span className="text-orange-600 font-semibold">{plan?.name}</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {result === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
              <p className="text-gray-500 mb-6">Thank you for your interest. Our team will contact you shortly regarding the {plan?.name}.</p>
              <button onClick={onClose} className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Name</label>
                  <input required type="text" name="name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Phone</label>
                  <input required type="tel" name="phone" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="+91 98765..." />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address</label>
                <input required type="email" name="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Message (Optional)</label>
                <textarea name="message" rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="Tell us about your project requirements..."></textarea>
              </div>

              {result === 'error' && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} /> Something went wrong. Please try again.
                </div>
              )}

              <button 
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
        
        {result !== 'success' && (
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-xs text-gray-400">We respect your privacy. No spam.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const Services = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // --- SEO OPTIMIZATION ---
  useEffect(() => {
    document.title = "Services & Pricing | LazyWorkz";
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Transparent pricing for websites, ecommerce, and branding. Packages start at ₹2,999.";
    document.head.appendChild(metaDesc);
    return () => document.head.removeChild(metaDesc);
  }, []);

  return (
    <div className="pt-16 w-full overflow-x-hidden font-sans bg-white selection:bg-orange-100 selection:text-orange-700">
      
      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPlan && (
          <ContactModal 
            plan={selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
          />
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION (LAG FIXED) */}
      <header className="relative py-20 lg:py-28 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* LAG FIX: MOBILE (Static Gradient - Fast) */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-white to-white md:hidden"></div>

        {/* LAG FIX: DESKTOP (Heavy Blobs - Hidden on Mobile) */}
        <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-6">
              <Sparkles size={14} className="text-orange-500" />
              Transparent Pricing
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Web Solutions that fit <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Your Budget.
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
              Professional websites starting at just ₹2,999. No hidden development fees.
            </p>

            <div className="inline-flex items-start md:items-center gap-3 bg-blue-50 border border-blue-100 p-4 rounded-lg max-w-xl mx-auto text-left md:text-center">
              <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5 md:mt-0" />
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Note:</span> Domain Name & Web Hosting charges are <span className="underline decoration-blue-300">not included</span> in the packages below.
              </p>
            </div>

          </motion.div>
        </div>
      </header>

      {/* 2. PRICING CARDS */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto">
          
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: plan.delay }}
              // LAG FIX: 'will-change-transform' optimizes scrolling performance
              className={`
                relative flex flex-col p-6 rounded-2xl transition-all duration-300 h-full will-change-transform
                ${plan.isPopular 
                  ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20 md:scale-105 z-10 ring-1 ring-white/10' 
                  : 'bg-white text-gray-900 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 z-0'}
              `}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg tracking-wide uppercase flex items-center gap-1">
                    <Sparkles size={12} fill="currentColor" /> Best Value
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{plan.desc}</p>
              </div>

              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.period && (
                    <span className={`ml-1 text-xs font-medium ${plan.isPopular ? 'text-gray-500' : 'text-gray-400'}`}>{plan.period}</span>
                )}
              </div>

              <div className={`h-px w-full mb-6 ${plan.isPopular ? 'bg-gray-800' : 'bg-gray-100'}`}></div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className={`mt-0.5 p-0.5 rounded-full mr-2 shrink-0 ${plan.isPopular ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${plan.isPopular ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setSelectedPlan(plan)}
                className={`
                  group w-full font-bold py-3 rounded-lg text-sm text-center transition-all flex items-center justify-center gap-2 cursor-pointer
                  ${plan.isPopular 
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30' 
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'}
                `}
              >
                {plan.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 3. SPLIT FAQ SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left: Title & Context */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                Common Questions
              </h2>
              <p className="text-gray-600 mb-8">
                Unsure which package fits your needs? We are happy to discuss your custom requirements.
              </p>
              
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Need a Custom Quote?</h4>
                  <p className="text-sm text-gray-500 mb-4">For large scale applications or unique ideas.</p>
                  <button 
                    onClick={() => setSelectedPlan({ name: 'Custom Quote', price: 'TBD' })}
                    className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center group text-sm"
                  >
                    Contact Sales Team <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
              </div>
            </motion.div>
            
            {/* Right: Accordion */}
            <motion.div 
               className="lg:col-span-7"
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <FAQItem 
                    key={index} 
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpen={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex(index === openFaqIndex ? -1 : index)}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;