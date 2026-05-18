import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { blogPosts } from '../../data/blogPosts'

const API_BASE = import.meta.env.VITE_API_URL || ''

const POSTS_PER_PAGE = 12

const Blog = () => {
  const [apiBlogPosts, setApiBlogPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs`)
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.blogs)) {
          const mapped = data.blogs.map(b => ({
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
            tags: b.tags || [],
            fromAPI: true
          }))
          setApiBlogPosts(mapped)
        }
      })
      .catch(() => {})
  }, [])

  // API posts first, then static posts (excluding slug overlaps)
  const apiSlugs = new Set(apiBlogPosts.map(p => p.slug))
  const allPosts = [
    ...apiBlogPosts,
    ...blogPosts.filter(p => !apiSlugs.has(p.slug))
  ]

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const pagePosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Build page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = []
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-primary-50 pt-24 pb-20">
      <SEOMeta
        title="Blog - AI Automation Insights, Guides & Industry News"
        description="Explore CogniDrift's blog for expert insights on AI automation solutions, AI workflow automation examples, and how companies use AI assistants to grow their business."
        keywords="AI workflow automation examples, how companies use AI assistants, AI automation solutions blog, AI agents for business guides"
        url="/resources/blog"
      />
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
          {pagePosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-1 sm:gap-2 mt-12 sm:mt-16 flex-wrap"
          >
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-white border border-neutral-border text-text-secondary hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, i) =>
              page === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 py-2 text-text-muted text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white border border-neutral-border text-text-secondary hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-white border border-neutral-border text-text-secondary hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <p className="text-center text-sm text-text-muted mt-4">
            Page {currentPage} of {totalPages} &mdash; {allPosts.length} articles
          </p>
        )}

      </div>
    </div>
  )
}

export default Blog
