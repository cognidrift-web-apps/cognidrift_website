import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { blogPosts } from './Blog'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Find the current post
  const currentPost = blogPosts.find(post => post.slug === slug)

  // If post not found, redirect to blog
  if (!currentPost) {
    return (
      <div className="min-h-screen bg-primary-50 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Post not found</h1>
          <Link to="/resources/blog" className="text-primary-600 hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Get suggested posts (exclude current post)
  const suggestedPosts = blogPosts
    .filter(post => post.id !== currentPost.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={currentPost.image}
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:left-8"
        >
          <button
            onClick={() => navigate('/resources/blog')}
            className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </motion.div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
                {currentPost.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                {currentPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{currentPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{currentPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentPost.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-text-primary
            prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-4
            prose-ul:my-4 prose-ul:space-y-2
            prose-li:text-text-secondary
            prose-strong:text-text-primary prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        />

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-text-muted text-sm mb-2">Written by</p>
              <p className="font-semibold text-text-primary">{currentPost.author}</p>
            </div>
            <Link
              to="/contact"
              className="bg-primary-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm sm:text-base"
            >
              Get Started with AI
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Suggested Posts */}
      <div className="bg-primary-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 sm:mb-3">
              More <span className="text-primary-600">Articles</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">Continue reading our latest insights</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {suggestedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link
                    to={`/resources/blog/${post.slug}`}
                    className="text-primary-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 sm:mt-12"
          >
            <Link
              to="/resources/blog"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm sm:text-base"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
