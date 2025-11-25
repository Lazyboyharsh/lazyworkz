import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Minus, ArrowRight, Sparkles, AlertCircle, Palette, BarChart3 } from 'lucide-react';

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
      '5-10 Pages Website',
      'Mobile Responsive Layout',
      'Business Inquiry Form',
      'Google Maps Integration',
      'WhatsApp Chat Button',
      'Gallery & Testimonials'
    ],
    cta: 'Choose Business',
    isPopular: true, // Triggers the Dark Card design
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
    price: '₹1,999',
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

// --- MAIN COMPONENT ---
const Services = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="pt-16 w-full overflow-x-hidden font-sans bg-white selection:bg-orange-100 selection:text-orange-700">
      
      {/* 1. HERO SECTION WITH GRID PATTERN */}
      <header className="relative py-20 lg:py-28 overflow-hidden">
        {/* CSS Grid Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {/* Soft Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-6">
              <Sparkles size={14} className="text-orange-500" />
              Transparent Indian Pricing
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

            {/* Disclaimer Alert */}
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
        {/* UPDATED GRID: Fits 6 items perfectly on large screens (3 columns) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto">
          
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: plan.delay }}
              className={`
                relative flex flex-col p-6 rounded-2xl transition-all duration-300 h-full
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

              <a 
                href="/contact" 
                className={`
                  group w-full font-bold py-3 rounded-lg text-sm text-center transition-all flex items-center justify-center gap-2
                  ${plan.isPopular 
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30' 
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'}
                `}
              >
                {plan.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
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
                  <a href="/contact" className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center group text-sm">
                    Contact Sales Team <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
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