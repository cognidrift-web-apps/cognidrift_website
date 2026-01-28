import { motion } from 'framer-motion'
import { FileText, Calendar, ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const Blog = () => {
  const posts = [
    {
      title: 'The Future of AI in Customer Service',
      excerpt: 'Discover how AI voice agents are transforming customer service across industries...',
      date: 'January 25, 2026',
      author: 'Sarah Johnson',
      category: 'AI Technology',
      image: '🤖'
    },
    {
      title: '5 Ways AI Receptionists Improve Patient Care',
      excerpt: 'Healthcare facilities are seeing dramatic improvements in patient satisfaction...',
      date: 'January 20, 2026',
      author: 'Dr. Michael Chen',
      category: 'Healthcare',
      image: '🏥'
    },
    {
      title: 'ROI Calculator: Cost of Missed Calls',
      excerpt: 'Learn how much money your business is losing from missed opportunities...',
      date: 'January 15, 2026',
      author: 'Alex Martinez',
      category: 'Business',
      image: '💰'
    },
    {
      title: 'Implementing AI: A Step-by-Step Guide',
      excerpt: 'A comprehensive guide to integrating AI voice agents into your business...',
      date: 'January 10, 2026',
      author: 'Emily Roberts',
      category: 'Implementation',
      image: '📋'
    },
    {
      title: 'Real Estate Success Stories',
      excerpt: 'How top real estate agencies are capturing 100% of their leads with AI...',
      date: 'January 5, 2026',
      author: 'Tom Wilson',
      category: 'Case Study',
      image: '🏡'
    },
    {
      title: 'Voice AI Security and Compliance',
      excerpt: 'Understanding HIPAA, GDPR, and data security in voice AI applications...',
      date: 'December 30, 2025',
      author: 'Jennifer Lee',
      category: 'Security',
      image: '🔒'
    }
  ]

  return (
    <div className="min-h-screen bg-primary-50 pt-24 pb-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-wider text-primary-600 font-semibold mb-4">
            Blog & Resources
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Latest <span className="text-primary-600">Insights</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and best practices in AI voice automation.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="h-48 bg-primary-200 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-text-muted" />
                    <span className="text-xs text-text-muted">{post.author}</span>
                  </div>
                  <Link to="#" className="text-primary-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
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
          className="mt-16 bg-primary-600 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white"
        >
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 opacity-90">
            Get the latest insights on AI voice automation delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-text-primary"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors animate-glow">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog
