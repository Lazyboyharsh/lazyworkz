import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

// --- BLOG DATA ---
const articles = [
  {
    id: 'react-vs-wordpress',
    title: "React vs. WordPress: Why We Choose Speed Over Bloat",
    excerpt: "Is your WordPress site losing you customers? Discover why modern businesses are switching to React for lightning-fast load times and better security.",
    category: "Tech",
    date: "Jan 04, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'hard-work-vs-smart-work',
    title: "Why Hard Work Won't Grow Your Business (But a Fast Website Will)",
    excerpt: "Manual networking is exhausting. Learn how a high-performance website works 24/7 to generate leads while you sleep.",
    category: "Business",
    date: "Jan 04, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'hidden-costs-wix',
    title: "The Hidden Costs of 'Free' Website Builders",
    excerpt: "Think you're saving money with Wix or Squarespace? We break down the hidden fees and limitations that cost you more in the long run.",
    category: "Finance",
    date: "Jan 04, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | LazyWorkz - Smart Business Insights";
    window.scrollTo(0, 0);
  }, []);

  return (
    // FIX: Increased padding-top to pt-32 (mobile) and pt-40 (desktop)
    <div className="pt-32 md:pt-40 min-h-screen bg-gray-50 font-sans">
      
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          The <span className="text-orange-600">Lazy</span> Log
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Insights on working smarter, not harder. Tips for digital growth, SEO, and business automation.
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Image */}
              <Link to={`/blog/${post.id}`} className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1 shadow-sm">
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
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
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
  );
};

export default Blog;