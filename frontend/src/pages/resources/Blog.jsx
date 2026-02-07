import { motion } from 'framer-motion'
import { FileText, Calendar, ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'

// Blog posts data - exported for use in BlogPost component
export const blogPosts = [
  {
    id: 1,
    slug: 'future-of-ai-customer-service',
    title: 'The Future of AI in Customer Service',
    excerpt: 'Discover how AI voice agents are transforming customer service across industries...',
    content: `
      <p>Artificial Intelligence is revolutionizing the way businesses interact with their customers. From chatbots to voice agents, AI-powered solutions are becoming increasingly sophisticated and capable of handling complex customer inquiries.</p>

      <h2>The Rise of Conversational AI</h2>
      <p>Gone are the days when automated customer service meant frustrating phone trees and robotic responses. Today's AI voice agents can understand context, detect emotions, and provide personalized responses that feel natural and helpful.</p>

      <h2>Key Benefits for Businesses</h2>
      <ul>
        <li><strong>24/7 Availability:</strong> AI never sleeps, ensuring customers can get help anytime.</li>
        <li><strong>Scalability:</strong> Handle thousands of conversations simultaneously without additional staff.</li>
        <li><strong>Consistency:</strong> Every customer receives the same high-quality service.</li>
        <li><strong>Cost Efficiency:</strong> Reduce operational costs while improving customer satisfaction.</li>
      </ul>

      <h2>What's Next?</h2>
      <p>As natural language processing continues to advance, we can expect AI agents to become even more human-like in their interactions. The future of customer service is here, and it's powered by artificial intelligence.</p>
    `,
    date: 'January 25, 2026',
    author: 'Sarah Johnson',
    category: 'AI Technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 2,
    slug: 'ai-receptionists-patient-care',
    title: '5 Ways AI Receptionists Improve Patient Care',
    excerpt: 'Healthcare facilities are seeing dramatic improvements in patient satisfaction...',
    content: `
      <p>Healthcare facilities around the world are embracing AI receptionists to enhance patient experiences and streamline operations. Here are five ways this technology is making a difference.</p>

      <h2>1. Reduced Wait Times</h2>
      <p>AI receptionists can handle multiple calls simultaneously, drastically reducing the time patients spend waiting on hold. This immediate response improves patient satisfaction and reduces frustration.</p>

      <h2>2. 24/7 Appointment Scheduling</h2>
      <p>Patients can book, reschedule, or cancel appointments at any hour. This flexibility is especially valuable for those with busy schedules or urgent needs outside business hours.</p>

      <h2>3. Automated Reminders</h2>
      <p>AI systems can send personalized appointment reminders via call, text, or email, reducing no-show rates by up to 35%.</p>

      <h2>4. HIPAA-Compliant Communication</h2>
      <p>Modern AI receptionists are designed with healthcare compliance in mind, ensuring patient information is handled securely and in accordance with regulations.</p>

      <h2>5. Staff Relief</h2>
      <p>By handling routine inquiries, AI receptionists free up medical staff to focus on what matters most: providing excellent patient care.</p>
    `,
    date: 'January 20, 2026',
    author: 'Dr. Michael Chen',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
    readTime: '4 min read'
  },
  {
    id: 3,
    slug: 'roi-calculator-missed-calls',
    title: 'ROI Calculator: Cost of Missed Calls',
    excerpt: 'Learn how much money your business is losing from missed opportunities...',
    content: `
      <p>Every missed call represents a potential lost customer. But have you ever calculated the true cost of these missed opportunities? Let's break down the numbers.</p>

      <h2>The Hidden Cost of Missed Calls</h2>
      <p>Studies show that 67% of callers who can't reach a business will not call back. Instead, they'll call your competitor. With an average customer lifetime value of $1,200, each missed call could cost your business significantly.</p>

      <h2>Calculate Your Losses</h2>
      <p>Consider these factors:</p>
      <ul>
        <li>Average calls missed per day</li>
        <li>Your conversion rate for phone leads</li>
        <li>Average transaction value</li>
        <li>Customer lifetime value</li>
      </ul>

      <h2>The AI Solution</h2>
      <p>An AI receptionist ensures you never miss a call again. With 24/7 availability and instant response times, you can capture every lead and maximize your revenue potential.</p>

      <h2>Real Results</h2>
      <p>Businesses implementing AI voice agents report an average 40% increase in captured leads and a 25% boost in revenue within the first six months.</p>
    `,
    date: 'January 15, 2026',
    author: 'Alex Martinez',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    readTime: '6 min read'
  },
  {
    id: 4,
    slug: 'implementing-ai-guide',
    title: 'Implementing AI: A Step-by-Step Guide',
    excerpt: 'A comprehensive guide to integrating AI voice agents into your business...',
    content: `
      <p>Implementing AI voice agents in your business doesn't have to be complicated. Follow this step-by-step guide to ensure a smooth transition.</p>

      <h2>Step 1: Assess Your Needs</h2>
      <p>Start by identifying the specific tasks you want AI to handle. Common use cases include appointment scheduling, FAQ responses, lead qualification, and call routing.</p>

      <h2>Step 2: Choose the Right Solution</h2>
      <p>Look for an AI platform that offers the features you need, integrates with your existing tools, and provides reliable support.</p>

      <h2>Step 3: Plan Your Implementation</h2>
      <p>Create a timeline and identify key stakeholders. Consider running a pilot program before full deployment.</p>

      <h2>Step 4: Train Your AI</h2>
      <p>Provide your AI with the information it needs: business hours, services, pricing, FAQs, and any industry-specific knowledge.</p>

      <h2>Step 5: Test and Refine</h2>
      <p>Conduct thorough testing with various scenarios. Gather feedback and make adjustments as needed.</p>

      <h2>Step 6: Launch and Monitor</h2>
      <p>Go live and continuously monitor performance. Use analytics to identify areas for improvement.</p>
    `,
    date: 'January 10, 2026',
    author: 'Emily Roberts',
    category: 'Implementation',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    readTime: '7 min read'
  },
  {
    id: 5,
    slug: 'real-estate-success-stories',
    title: 'Real Estate Success Stories',
    excerpt: 'How top real estate agencies are capturing 100% of their leads with AI...',
    content: `
      <p>The real estate industry is highly competitive, and capturing every lead is crucial for success. Here's how leading agencies are using AI to stay ahead.</p>

      <h2>Case Study: Premier Realty Group</h2>
      <p>Premier Realty was missing 40% of incoming calls during showings and off-hours. After implementing an AI receptionist, they captured 100% of leads and saw a 60% increase in qualified appointments.</p>

      <h2>The 24/7 Advantage</h2>
      <p>Home buyers often search for properties outside business hours. An AI receptionist ensures you're always available to answer questions and schedule viewings.</p>

      <h2>Lead Qualification</h2>
      <p>AI can ask qualifying questions to identify serious buyers, saving agents time and allowing them to focus on high-value prospects.</p>

      <h2>Instant Property Information</h2>
      <p>Callers can get immediate information about listings, including price, features, and availability for viewing.</p>

      <h2>Results Across the Industry</h2>
      <p>Real estate agencies using AI voice agents report an average 45% increase in lead capture and 30% more closed deals.</p>
    `,
    date: 'January 5, 2026',
    author: 'Tom Wilson',
    category: 'Case Study',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 6,
    slug: 'voice-ai-security-compliance',
    title: 'Voice AI Security and Compliance',
    excerpt: 'Understanding HIPAA, GDPR, and data security in voice AI applications...',
    content: `
      <p>As AI voice technology becomes more prevalent, understanding security and compliance requirements is essential. Here's what you need to know.</p>

      <h2>HIPAA Compliance</h2>
      <p>For healthcare organizations, HIPAA compliance is non-negotiable. Look for AI solutions that offer encrypted communications, secure data storage, and comprehensive audit trails.</p>

      <h2>GDPR Requirements</h2>
      <p>If you serve customers in the EU, your AI system must comply with GDPR. This includes obtaining consent for data collection and providing users with access to their data.</p>

      <h2>Data Encryption</h2>
      <p>Ensure your AI provider uses end-to-end encryption for all voice communications and data storage.</p>

      <h2>Access Controls</h2>
      <p>Implement role-based access controls to ensure only authorized personnel can access sensitive information.</p>

      <h2>Regular Audits</h2>
      <p>Conduct regular security audits and choose providers who maintain SOC 2 Type II certification.</p>

      <h2>Best Practices</h2>
      <ul>
        <li>Review your AI provider's security certifications</li>
        <li>Understand where and how data is stored</li>
        <li>Establish clear data retention policies</li>
        <li>Train staff on security protocols</li>
      </ul>
    `,
    date: 'December 30, 2025',
    author: 'Jennifer Lee',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
    readTime: '6 min read'
  }
]

const Blog = () => {
  return (
    <div className="min-h-screen bg-primary-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-wider text-primary-600 font-semibold mb-4">
            Blog & Resources
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6">
            Latest <span className="text-primary-600">Insights</span>
          </h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto px-2">
            Stay updated with the latest trends, tips, and best practices in AI voice automation.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="h-40 sm:h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-600 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-text-muted" />
                    <span className="text-xs text-text-muted">{post.author}</span>
                  </div>
                  <Link
                    to={`/resources/blog/${post.slug}`}
                    className="text-primary-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 bg-primary-600 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center text-white"
        >
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" />
          <h2 className="hero-display text-2xl sm:text-3xl md:text-4xl mb-4">Stay <span className="text-primary-200">Updated</span></h2>
          <p className="text-base sm:text-lg mb-6 opacity-90">
            Get the latest insights on AI voice automation delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-text-primary text-sm sm:text-base"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors animate-glow text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog
