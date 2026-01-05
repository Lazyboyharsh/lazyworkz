import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, CheckCircle, XCircle } from 'lucide-react';

// --- FULL BLOG CONTENT DATABASE ---
const blogContent = {
  'react-vs-wordpress': {
    title: "React vs. WordPress: Why We Choose Speed Over Bloat",
    date: "Jan 10, 2026",
    author: "Harsh Jain",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-6">
          For over a decade, WordPress has been the default choice for building websites. It powers 40% of the internet. But being popular doesn't mean it's the best choice for your business in 2026. If you care about speed, security, and ranking #1 on Google, it might be time to look at the modern alternative: React.
        </p>

        <h2>The Speed Problem: Monolith vs. SPA</h2>
        <p>
          The biggest difference between WordPress and React is how they handle data. WordPress is a "Monolithic" system. Every time a user clicks a link, the server has to build the entire page from scratch—header, footer, content, and sidebar—and send it to the browser. This takes time.
        </p>
        <p>
          React, on the other hand, builds <strong>Single Page Applications (SPAs)</strong>. When a user visits your site, we load the structure once. When they click a link, we only swap out the content in the middle. The result? <strong>Instant transitions.</strong> No loading spinners. No white screens.
        </p>

        <div className="bg-orange-50 p-6 rounded-xl my-8 border-l-4 border-orange-500">
          <h4 className="text-orange-800 font-bold mb-2">Why Google Cares</h4>
          <p className="text-orange-700 text-sm mb-0">
            Google's "Core Web Vitals" update specifically penalizes slow websites. If your site takes more than 2.5 seconds to load, your ranking drops. React websites built by LazyWorkz consistently score 95+ on Google PageSpeed Insights.
          </p>
        </div>

        <h2>Security: Stop Getting Hacked</h2>
        <p>
          WordPress relies on plugins. You need a plugin for SEO, a plugin for forms, a contact plugin, and a caching plugin. The average WordPress site has 20-30 plugins.
        </p>
        <p>
          The problem? <strong>Plugins are security holes.</strong> If one plugin developer stops updating their code, hackers can use that backdoor to take down your entire site.
        </p>
        <p>
          With React, we don't use 3rd party plugins for basic functionality. We write clean, custom code. There is no database for hackers to inject SQL into on the frontend. It is secure by design.
        </p>

        <h2>The "Lazy" Maintenance Benefit</h2>
        <p>
          Ironically, the "hard" way of coding (React) leads to the "laziest" ownership experience for you.
        </p>
        <ul className="list-none pl-0 space-y-4 my-6">
          <li className="flex items-start gap-3">
            <XCircle className="text-red-500 w-6 h-6 flex-shrink-0 mt-1" />
            <span><strong>WordPress:</strong> You need to log in weekly to update themes and plugins, praying that an update doesn't break your site.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0 mt-1" />
            <span><strong>React:</strong> The code we write today will work next year. There are no "plugin updates" to manage. It just works.</span>
          </li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          If you are a hobby blogger, WordPress is fine. But if you are a business owner building a brand, you cannot afford a slow, insecure website. React offers the performance of a Ferrari with the reliability of a Toyota.
        </p>
      </>
    )
  },

  'hard-work-vs-smart-work': {
    title: "Why Hard Work Won't Grow Your Business (But a Fast Website Will)",
    date: "Jan 05, 2026",
    author: "Team LazyWorkz",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-6">
          We are taught from a young age that "hard work pays off." If you want more clients, make more calls. If you want more sales, work longer hours. At LazyWorkz, we fundamentally disagree. Hard work doesn't scale. Smart systems do.
        </p>

        <h2>The Trap of Manual Labor</h2>
        <p>
          Imagine you are a real estate agent or a consultant. You attend networking events, hand out business cards, and reply to DMs on Instagram. This is "active" lead generation.
        </p>
        <p>
          The problem is that <strong>when you stop working, the leads stop coming.</strong> You are trading time for money. There is a cap on how much you can earn because there is a cap on how many hours you can stay awake.
        </p>

        <h2>The Website as an Employee</h2>
        <p>
          A high-performance website is not a digital brochure; it is a 24/7 sales employee.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>It answers FAQs while you sleep.</li>
          <li>It captures email leads while you are on vacation.</li>
          <li>It processes payments without you lifting a finger.</li>
        </ul>

        <h2>Case Study: The "Lazy" Funnel</h2>
        <p>
          Let's look at a recent client. They were spending 4 hours a day answering the same questions on WhatsApp. We built them a React website with a dynamic FAQ section and an automated booking form.
        </p>
        <p>
          <strong>The Result:</strong> They saved 20 hours a week. Their revenue went up 30% because the website made it easier for customers to buy <em>right now</em>, rather than waiting for a WhatsApp reply.
        </p>

        <h2>Why "Fast" Matters</h2>
        <p>
          Automation only works if people stick around. If your website takes 5 seconds to load, 40% of users will leave before seeing your offer. 
        </p>
        <p>
          This is why we obsess over speed. We build sites that load in milliseconds, ensuring that the traffic you work hard to get actually converts into paying customers.
        </p>

        <h3>Ready to stop grinding?</h3>
        <p>
          Let us build the system that lets you be lazy. Focus on your craft, and let your website handle the hustle.
        </p>
      </>
    )
  },

  'hidden-costs-wix': {
    title: "The Hidden Costs of 'Free' Website Builders",
    date: "Jan 02, 2026",
    author: "Team LazyWorkz",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200",
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-6">
          Ads for Wix, Squarespace, and Shopify are everywhere. They promise a "stunning website for free." It sounds too good to be true—and it is. While these platforms are great for hobbyists, they are often a financial trap for serious businesses.
        </p>

        <h2>1. The "Free" Tier is Useless</h2>
        <p>
          Sure, you can build a site for free. But can you connect your own domain (like <code>yourbusiness.com</code>)? No. You are stuck with <code>yourbusiness.wixsite.com</code>. This screams "amateur" to potential clients.
        </p>
        <p>
          To connect a domain, remove their ads, and get basic analytics, you have to upgrade. The average cost is $20 - $30 per month. That is ₹25,000+ per year, every year, forever.
        </p>

        <h2>2. You Are Renting, Not Owning</h2>
        <p>
          This is the biggest risk. When you build on a site builder, <strong>you do not own your code.</strong> You cannot download your website and move it to a cheaper server. You are locked into their ecosystem.
        </p>
        <p>
          If they raise their prices (which they do every year), you have no choice but to pay. If they ban your account, your business disappears overnight.
        </p>

        <h2>3. The SEO Ceiling</h2>
        <p>
          Website builders generate "bloated" code. They load hundreds of scripts you don't need, which slows down your site.
        </p>
        <p>
          Google hates slow code. While you can rank locally with a builder site, it is incredibly difficult to compete for high-volume keywords against custom-coded React websites. You are fighting with one hand tied behind your back.
        </p>

        <h2>The LazyWorkz Alternative</h2>
        <p>
          When we build a website for you, <strong>you own it.</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>One-time development fee.</li>
          <li>Zero monthly subscription fees (you only pay for hosting, which is often free on Vercel/Netlify).</li>
          <li>Clean, lightweight code that Google loves.</li>
          <li>100% Portability. It's your file. Do what you want with it.</li>
        </ul>

        <p>
          Don't build your house on rented land. Build a digital asset that you actually own.
        </p>
      </>
    )
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogContent[id];

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | LazyWorkz Blog`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  // --- SHARE FUNCTIONALITY ---
  const handleShare = async () => {
    const shareData = {
        title: post.title,
        text: `Check out this article by LazyWorkz: ${post.title}`,
        url: window.location.href, 
    };

    if (navigator.share) {
        try { await navigator.share(shareData); } catch (err) { console.log(err); }
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        } catch (err) {
            alert("Failed to copy link.");
        }
    }
  };

  if (!post) return <Navigate to="/blog" />;

  return (
    <article className="pt-36 md:pt-44 pb-20 bg-white min-h-screen font-sans">
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 max-w-3xl mb-10">
        
        <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-6 transition-colors font-medium">
          <ArrowLeft size={18} className="mr-2" /> Back to Blog
        </Link>
        
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-64 md:h-[400px] object-cover rounded-3xl shadow-xl mb-8"
        />
        
        {/* Meta Data & Share Button */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
          <span className="flex items-center gap-2"><Calendar size={16} className="text-orange-500" /> {post.date}</span>
          <span className="flex items-center gap-2"><User size={16} className="text-orange-500" /> {post.author}</span>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 ml-auto text-gray-600 hover:text-orange-600 transition-colors font-bold"
          >
            <Share2 size={16} /> Share Now
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Article Body */}
        <div className="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed">
          {post.content}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gray-900 text-white border border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Read enough? Let's build.</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Stop researching and start growing. Get a high-performance React website for your business today.
          </p>
          <Link to="/contact" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
            Start Your Project
          </Link>
        </div>

      </div>
    </article>
  );
};

export default BlogPost;