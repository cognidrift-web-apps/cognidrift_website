import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'
import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [currentPost, setCurrentPost] = useState(null)
  const [suggestedPosts, setSuggestedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)

    // Try API first
    fetch(`${API_BASE}/api/blogs/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.blog) {
          const b = data.blog
          const post = {
            id: b._id,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            content: b.content || '',
            author: b.author,
            authorRole: b.authorRole || '',
            category: b.category,
            image: b.image || 'https://placehold.co/800x450/2563eb/ffffff?text=Blog+Post',
            readTime: b.readTime || '5 min read',
            date: new Date(b.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          }
          setCurrentPost(post)
          // Fetch other posts for suggestions
          return fetch(`${API_BASE}/api/blogs`)
            .then(r => r.json())
            .then(listData => {
              const others = listData.success
                ? listData.blogs
                    .filter(p => p.slug !== slug)
                    .slice(0, 3)
                    .map(p => ({
                      id: p._id, slug: p.slug, title: p.title, excerpt: p.excerpt,
                      category: p.category, readTime: p.readTime,
                      image: p.image || 'https://placehold.co/800x450/2563eb/ffffff?text=Blog+Post',
                    }))
                : []
              // Fill remaining suggestions from static posts
              const combined = [...others, ...blogPosts.filter(p => p.slug !== slug && !others.find(o => o.slug === p.slug))].slice(0, 3)
              setSuggestedPosts(combined)
            })
        } else {
          throw new Error('not found')
        }
      })
      .catch(() => {
        // Fall back to static posts
        const staticPost = blogPosts.find(p => p.slug === slug)
        if (staticPost) {
          setCurrentPost(staticPost)
          setSuggestedPosts(blogPosts.filter(p => p.id !== staticPost.id).slice(0, 3))
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !currentPost) {
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

  return (
    <div className="min-h-screen bg-white pt-20">
      <SEOMeta
        title={currentPost?.title}
        description={currentPost?.excerpt || currentPost?.description}
        url={'/resources/blog/' + currentPost?.slug}
      />
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={currentPost.image}
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

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
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block font-medium">{currentPost.author}</span>
                    <span className="block text-xs text-white/70">{currentPost.authorRole}</span>
                  </div>
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
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        />

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gray-50 rounded-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1">{currentPost.author}</h3>
              <p className="text-primary-600 font-medium text-sm mb-2">{currentPost.authorRole}</p>
              <p className="text-text-secondary text-sm">
                Expert contributor to CogniDrift's blog, sharing insights on AI technology and business automation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-12 p-6 sm:p-8 bg-primary-600 rounded-2xl text-center text-white"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3">Ready to Transform Your Business?</h3>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            See how CogniDrift's AI voice agents can help you capture every lead and delight every customer.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-sm sm:text-base"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Suggested Posts */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 sm:mb-3">
              Continue <span className="text-primary-600">Reading</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">Explore more insights and guides</p>
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

      {/* Add custom styles for blog content */}
      <style>{`
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
        }

        .blog-content p.lead {
          font-size: 1.25rem;
          color: #1f2937;
          font-weight: 500;
          line-height: 1.7;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .blog-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .blog-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .blog-content ul {
          list-style-type: disc;
        }

        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }

        .blog-content li strong {
          color: #111827;
        }

        .blog-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .blog-content blockquote {
          border-left: 4px solid #2563eb;
          padding: 1.5rem;
          margin: 2rem 0;
          background: #f8fafc;
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .blog-content blockquote br {
          display: block;
          content: "";
          margin-top: 1rem;
        }

        .blog-content .calculation-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .blog-content .calculation-box ul {
          margin-bottom: 0;
        }

        @media (max-width: 640px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.7;
          }

          .blog-content p.lead {
            font-size: 1.125rem;
          }

          .blog-content h2 {
            font-size: 1.5rem;
            margin-top: 2rem;
          }

          .blog-content h3 {
            font-size: 1.25rem;
          }

          .blog-content h4 {
            font-size: 1.0625rem;
          }

          .blog-content blockquote {
            padding: 1rem;
            margin: 1.5rem 0;
          }
        }
      `}</style>
    </div>
  )
}

export default BlogPost
