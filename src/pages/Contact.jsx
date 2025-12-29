import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Plus, 
  Minus, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Sparkles, 
  MessageCircle, 
  AlertCircle,
  ArrowRight // Imported directly from lucide-react
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const contactDetails = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Us",
    info: "notalazy865@gmail.com",
    sub: "Response within 24 hours.",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Visit Us",
    info: "Nangli, Najafgarh",
    sub: "New Delhi - 110043",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Call Us",
    info: "+91 96253 57573",
    sub: "Mon-Fri from 9am to 6pm.",
  },
];

const faqs = [
  {
    question: 'Why "LazyWorkz"?',
    answer: 'We aren\'t actually lazy! We believe in "Productive Laziness" — finding the most efficient, automated, and stress-free way to solve a problem so it doesn\'t break later.',
  },
  {
    question: 'How long does a website take?',
    answer: 'Typically, our projects range from 1 to 2 weeks for standard informational sites, and 4 to 5 weeks for complex e-commerce or custom builds. We emphasize quality over speed.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We work in milestones. If you aren\'t happy with the design phase, we fix it before moving to code. You only pay for the next stage when you are happy with the current one.',
  },
];

// --- SUB-COMPONENT: FAQ ITEM ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
const Contact = () => {
  const [status, setStatus] = useState('idle'); 
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Form State for controlled inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const validateEmail = (value) => {
    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!value) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) validateEmail(val);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setStatus('submitting');

    const ACCESS_KEY = "3ba0f05a-b567-4edd-8985-ffdabe341542"; 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: ACCESS_KEY,
            
            // This sets the Email Title in your inbox
            subject: `New Message: ${formData.subject}`, 
            
            // --- DATA FIELDS (These appear inside the email) ---
            Name: formData.name,
            Email: email,
            Phone: formData.phone,
            
            // We rename this to "Inquiry_Type" so it definitely shows up in the body
            Inquiry_Type: formData.subject, 
            
            Message: formData.message,
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
        setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        console.error("Form error:", data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="pt-16 w-full overflow-x-hidden font-sans bg-white selection:bg-orange-100 selection:text-orange-700">
      
      {/* 1. HERO HEADER */}
      <header className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-6">
              <MessageCircle size={14} className="text-orange-500" />
              We Reply Fast
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Let's Start a <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Conversation.
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Whether you have a question, a project idea, or just want to say hi—we'll get back to you faster than your code compiles.
            </p>
          </motion.div>
        </div>
      </header>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          
          {/* LEFT COLUMN: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                We are a remote-first team, but we are always connected. Reach out through any of these channels for a quick response.
              </p>
              
              <div className="grid gap-6">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-orange-500 shadow-sm border border-gray-100">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-900 font-medium select-all">{item.info}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gray-900 rounded-3xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h4 className="font-bold text-xl mb-2 relative z-10">Join our community</h4>
              <p className="text-gray-400 text-sm mb-6 relative z-10">Follow us for updates and tech tips.</p>
              <div className="flex gap-4 relative z-10">
                {[<Twitter key="t" size={20} />, <Linkedin key="l" size={20} />, <Instagram key="i" size={20} />].map((icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative min-h-[500px]"
          >
            <AnimatePresence mode='wait'>
              {status === 'success' ? (
                // SUCCESS STATE
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-8">We'll get back to you faster than you can say "Lazy Workz".</p>
                  <button 
                    onClick={() => setStatus('idle')} 
                    className="px-6 py-2 rounded-full bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                // FORM STATE
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-orange-500" size={20} />
                    <h3 className="text-2xl font-bold text-gray-900">Send a Message</h3>
                  </div>
                  
                  {/* Row 1: Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Name</label>
                      <input 
                        required 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-gray-900" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
                      <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={(e) => validateEmail(e.target.value)}
                        className={`w-full p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-4 transition-all font-medium text-gray-900
                          ${emailError 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                            : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500/10'
                          }`}
                        placeholder="john@example.com" 
                      />
                      <AnimatePresence>
                        {emailError && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center gap-1.5 mt-2 text-red-500 text-xs font-medium"
                          >
                            <AlertCircle size={14} />
                            {emailError}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                   {/* Row 2: Phone and Subject */}
                   <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium z-10">+91</span>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          pattern="[6-9][0-9]{9}"
                          maxLength="10"
                          className="w-full p-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-gray-900" 
                          placeholder="98765 43210" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Subject</label>
                      <select 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-gray-900"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Portfolio Website">Portfolio Website</option>
                        <option value="Company Profile">Company Profile</option>
                        <option value="E-commerce Store">E-commerce Store</option>
                        <option value="Logo & Branding">Logo & Branding</option>
                        <option value="Custom Build">Custom Build</option>
                        <option value="Just saying hi">Just saying hi</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Message</label>
                    <textarea 
                        required 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-gray-900" 
                        placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                        <AlertCircle size={16} />
                        Failed to send message. Please try again.
                    </div>
                  )}

                  <button 
                    disabled={status === 'submitting'}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center shadow-lg hover:shadow-orange-500/30"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <ArrowRight size={18} />
                      </span>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
          >
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about working with LazyWorkz.
            </p>
          </motion.div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;