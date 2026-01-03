import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Plus, Minus, ArrowRight, Sparkles,
  AlertCircle, X, Loader2
} from 'lucide-react';

/* ---------------- DATA ---------------- */
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
      'Vector Source Files',
      'High-Res Files',
      'Color Palette',
      'Typography Guide',
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
      'GA4 Setup',
      'Monthly Reports',
      'Heatmaps',
      'Conversion Optimization',
      'Competitor Analysis',
      'SEO Tracking'
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
      'Custom Applications',
      'API Integrations',
      'SaaS Development',
      'Scalable Architecture',
      'Complex Databases',
      'Dedicated Support'
    ],
    cta: 'Contact Us',
    isPopular: false,
    delay: 0.6,
  },
];

const faqs = [
  {
    question: 'Is Hosting and Domain included?',
    answer: 'No. Domain & Hosting are separate. We can help you purchase them.',
  },
  {
    question: 'Delivery time for Company Profile?',
    answer: 'Usually 5–7 working days after content is shared.',
  },
  {
    question: 'Do you provide e-commerce maintenance?',
    answer: 'Yes, we offer optional monthly maintenance plans.',
  },
  {
    question: 'Can I order only Logo Design?',
    answer: 'Yes. Logo & Branding is a standalone service.',
  },
];

/* ---------------- FAQ ITEM ---------------- */
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      onClick={onClick}
      className="w-full py-6 flex justify-between items-center text-left"
    >
      <span className={`text-lg font-semibold ${isOpen ? 'text-orange-600' : 'text-gray-900'}`}>
        {question}
      </span>
      <div className="p-2 rounded-full bg-gray-100">
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </div>
    </button>
    {isOpen && (
      <p className="text-gray-600 pb-6 pr-8">{answer}</p>
    )}
  </div>
);

/* ---------------- MODAL ---------------- */
const ContactModal = ({ plan, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "3ba0f05a-b567-4edd-8985-ffdabe341542");
    formData.append("subject", `Inquiry: ${plan?.name}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResult(data.success ? 'success' : 'error');
      e.target.reset();
    } catch {
      setResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg p-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        {result === 'success' ? (
          <div className="text-center py-10">
            <Check size={40} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold">Message Sent!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" required placeholder="Name" className="w-full border px-4 py-3 rounded-lg" />
            <input name="phone" required placeholder="Phone" className="w-full border px-4 py-3 rounded-lg" />
            <input name="email" required type="email" placeholder="Email" className="w-full border px-4 py-3 rounded-lg" />
            <textarea name="message" rows="3" placeholder="Message" className="w-full border px-4 py-3 rounded-lg" />
            <button disabled={isSubmitting} className="w-full bg-orange-600 text-white py-4 rounded-lg">
              {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'Send Inquiry'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ---------------- MAIN ---------------- */
const Services = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  /* -------- SEO (REACT 19 SAFE) -------- */
  useEffect(() => {
    document.title = "LazyWorkz Pricing – Affordable Web Development Packages";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Explore LazyWorkz pricing for websites, e-commerce, branding, and SEO services. Affordable packages starting at ₹2,999.";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  return (
    <div className="pt-16 bg-white">

      <AnimatePresence>
        {selectedPlan && (
          <ContactModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Web Solutions that fit
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Your Budget
          </span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Professional websites starting at just ₹2,999. No hidden costs.
        </p>
      </section>

      {/* PRICING */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: plan.delay }}
              className={`p-6 rounded-2xl ${
                plan.isPopular ? 'bg-gray-900 text-white' : 'bg-white border'
              }`}
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-sm mt-2">{plan.desc}</p>

              <div className="text-3xl font-extrabold my-6">
                {plan.price} <span className="text-xs">{plan.period}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <Check size={14} /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan)}
                className="w-full bg-orange-500 text-white py-3 rounded-lg"
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-8 text-center">
            Common Questions
          </h2>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              {...faq}
              isOpen={openFaqIndex === i}
              onClick={() => setOpenFaqIndex(i === openFaqIndex ? -1 : i)}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Services;
