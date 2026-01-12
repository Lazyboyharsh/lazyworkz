import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// --- BLOG DATA (Synced exactly with BlogPost.jsx dates) ---
const articles = [
  // --- 2026 ENTRIES ---
  {
    id: 'website-cost-india-2026',
    title: "Website Development Cost in India (2026 Price Guide)",
    excerpt: "Confused by agencies charging ₹5,000 vs ₹5 Lakhs? We break down the real cost of building a business website in India.",
    category: "Finance",
    date: "Jan 9, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1544980919-e17526d4ed0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2Vic2l0ZSUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww"
  },
  {
    id: 'razorpay-vs-phonepe',
    title: "Razorpay vs PhonePe: Best Payment Gateway for Startups?",
    excerpt: "UPI is king. Which payment gateway offers the lowest TDR and fastest settlement for Indian businesses? We compare the giants.",
    category: "Fintech",
    date: "Jan 9, 2026",
    readTime: "6 min read",
    image: "https://media.istockphoto.com/id/1855314717/photo/two-hands-holding-mobile-phones-transferring-funds-between-accounts-isolated-on-purple.webp?a=1&b=1&s=612x612&w=0&k=20&c=spTckbb8lrvAqdoOe_aQN_oSqZhV6F88Xe-WGZ6y0P0="
  },
  {
    id: 'local-seo-google-maps',
    title: "Rank #1 on Google Maps: Local SEO Guide for Indian Shops",
    excerpt: "Running a cafe in Delhi or a boutique in Mumbai? Learn how to dominate 'Near Me' searches and double your footfall.",
    category: "SEO",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=873&auto=format&fit=crop"
  },
  {
    id: 'shopify-vs-custom-d2c',
    title: "Shopify vs Custom Code: What’s Best for Indian D2C Brands?",
    excerpt: "Should you pay monthly dollar fees to Shopify or build a custom React store? We analyze what works best for the Indian D2C ecosystem.",
    category: "E-commerce",
    date: "Jan 8, 2026",
    readTime: "7 min read",
    image: "https://plus.unsplash.com/premium_photo-1676150789916-2c7d1fdda6b9?q=80&w=774&auto=format&fit=crop"
  },
  {
    id: 'whatsapp-business-automation',
    title: "Automate Your Sales: The Power of WhatsApp Business API",
    excerpt: "India loves WhatsApp. Learn how to turn chats into sales automatically without hiring a support team.",
    category: "Automation",
    date: "Jan 7, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1678329886668-6f44024b9ae6?q=80&w=928&auto=format&fit=crop"
  },
  {
    id: 'startup-india-website-benefits',
    title: "Startup India Scheme: How a Website Helps You Get Funding",
    excerpt: "Investors need credibility. See why a professional digital presence is mandatory for DPIIT recognition and funding.",
    category: "Startup",
    date: "Jan 7, 2026",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/startup/1200/600"
  },
  {
    id: 'ondc-explained',
    title: "ONDC Explained: Will It Kill Amazon and Flipkart?",
    excerpt: "The Open Network for Digital Commerce is changing the game. innovative guide on how small retailers can join ONDC to save commissions.",
    category: "News",
    date: "Jan 6, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1674027392887-751d6396b710?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 'instagram-reels-vs-seo',
    title: "Instagram Reels vs. SEO: Where Should Indian Brands Focus?",
    excerpt: "Viral reels fade in 24 hours. SEO lasts for years. We discuss where you should invest your marketing budget in 2026.",
    category: "Marketing",
    date: "Jan 6, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519423791119-fef2800aaef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVlbHN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 'mobile-speed-jio-era',
    title: "Jio Changed Everything: Why Your Site Must Be Mobile-Fast",
    excerpt: "With 5G and Jio, Indian users are impatient. If your site takes 3+ seconds to load on mobile data, you are losing 40% of customers.",
    category: "Tech",
    date: "Jan 5, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1603533262601-ce30bda5f45c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2ltJTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 'cod-vs-prepaid-trust',
    title: "Cash on Delivery (COD) vs Prepaid: How to Build Trust Online",
    excerpt: "The Indian market loves COD, but it hurts your cash flow. Learn how a premium UI/UX design can convince users to pay online.",
    category: "Strategy",
    date: "Jan 4, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1687199127283-2bb87b8a92fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FzaCUyMG9uJTIwZGVsaXZlcnklMjBhbmQlMjBwcmVwYWlkfGVufDB8fDB8fHww"
  },
  // --- 2025 ENTRIES ---
  {
    id: 'vernacular-seo-india',
    title: "Bharat Goes Digital: Why You Need a Hindi/Regional Website",
    excerpt: "The next billion users in India prefer content in their native language. Is your business ready for the Vernacular internet?",
    category: "Growth",
    date: "Jan 9, 2026",
    readTime: "5 min read",
    image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 'wordpress-vs-react-india',
    title: "WordPress vs React: The Truth Indian Agencies Won't Tell You",
    excerpt: "Most agencies sell WordPress because it's easy for THEM. We explain why React is better for YOU.",
    category: "Tech",
    date: "Jan 8, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1560472355-109703aa3edc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29yZHByZXNzJTIwdnMlMjByZWFjdHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 'freelancer-vs-agency',
    title: "Freelancer vs Agency: Who Should Build Your Business Website?",
    excerpt: "Hiring a college student vs a professional agency. We compare cost, reliability, and long-term support risks.",
    category: "Business",
    date: "Jan 6, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWdlbmN5fGVufDB8fDB8fHww"
  },
  {
    id: 'ai-tools-for-sme',
    title: "5 AI Tools Every Indian SME Needs to Save Lakhs",
    excerpt: "From content writing to logo design, discover free AI tools that can replace expensive employees for small tasks.",
    category: "AI",
    date: "Jan 5, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1737641624486-7846df8528dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjB0b29sfGVufDB8fDB8fHww"
  },
  {
    id: 'influencer-marketing-roi',
    title: "Influencer Marketing in India: Is It Worth the Hype?",
    excerpt: "Should you pay Instagram influencers or Google Ads? A data-driven guide for Indian small businesses.",
    category: "Marketing",
    date: "Jan 4, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1646446824387-f3b946d99c13?w=500&auto=format&fit=crop"
  }
];

const Blog = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <div className="pt-32 md:pt-40 min-h-screen bg-gray-50 font-sans">
        
        {/* --- SEO METADATA FOR BLOG HUB --- */}
        <Helmet>
            <title>Blog | LazyWorkz - Business & Tech Insights for India</title>
            <meta name="description" content="Read the latest insights on Website Development costs in India, SEO strategies, Digital Marketing, and Business Growth. Advice for Indian Entrepreneurs." />
            <meta name="keywords" content="web development blog india, digital marketing tips, business growth india, lazyworkz blog" />
            <link rel="canonical" href={currentUrl} />
            <meta property="og:title" content="LazyWorkz Blog - Insights for Indian Business" />
            <meta property="og:description" content="Expert guides on Tech, SEO, and Growth for the Indian market." />
        </Helmet>

        {/* Header */}
        <div className="container mx-auto px-4 mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
            The <span className="text-orange-600">Lazy</span> Log
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Insights for the Indian Market. We decode Tech, SEO, and Business Growth for Desi Entrepreneurs.
          </p>
        </div>

        {/* Grid */}
        <div className="container mx-auto px-4 pb-24 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group h-full"
              >
                {/* Image */}
                <Link to={`/blog/${post.id}`} className="h-48 overflow-hidden relative block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Tag size={12} /> {post.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-400 mb-3 gap-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.id}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="flex items-center text-sm font-bold text-gray-900 hover:text-orange-600 transition-colors gap-2"
                    >
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </HelmetProvider>
  );
};

export default Blog;