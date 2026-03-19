import Blog from '../models/Blog.js';

// Helper: if content has no HTML tags, auto-wrap paragraphs in <p> tags
function ensureHtml(content) {
  if (!content) return content;
  if (/<[a-z][\s\S]*>/i.test(content)) return content; // already HTML
  return content
    .split(/\n\s*\n/)
    .map(para => para.trim())
    .filter(Boolean)
    .map(para => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}

// Helper: generate unique slug from title
async function generateSlug(title, excludeId = null) {
  let base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  let slug = base;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Blog.findOne(query);
    if (!existing) break;
    slug = `${base}-${counter++}`;
  }

  return slug;
}

// ─── PUBLIC ─────────────────────────────────────────────────────────────────

// GET /api/blogs  — all published posts (no content field)
export const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .select('-content')
      .lean();
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/blogs/:slug  — single published post
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' }).lean();
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── ADMIN (protected) ───────────────────────────────────────────────────────

// GET /api/admin/blogs  — all posts including drafts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-content')
      .lean();
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/admin/blogs/:id  — single post with content (for editing)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/admin/blogs  — create
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, authorRole, category, image, readTime, status, tags } = req.body;

    if (!title || !excerpt || !content || !author || !category) {
      return res.status(400).json({ success: false, error: 'title, excerpt, content, author, category are required' });
    }

    const slug = await generateSlug(title);

    const blog = new Blog({
      title, slug, excerpt, content: ensureHtml(content), author,
      authorRole: authorRole || '',
      category,
      image: image || undefined,
      readTime: readTime || '5 min read',
      status: status || 'draft',
      tags: Array.isArray(tags) ? tags : []
    });

    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/admin/blogs/:id  — update
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });

    const { title, excerpt, content, author, authorRole, category, image, readTime, status, tags } = req.body;

    // Re-generate slug only if title changed
    if (title && title !== blog.title) {
      blog.slug = await generateSlug(title, blog._id);
      blog.title = title;
    }

    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = ensureHtml(content);
    if (author !== undefined) blog.author = author;
    if (authorRole !== undefined) blog.authorRole = authorRole;
    if (category !== undefined) blog.category = category;
    if (image !== undefined) blog.image = image;
    if (readTime !== undefined) blog.readTime = readTime;
    if (status !== undefined) blog.status = status;
    if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : [];

    await blog.save();
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/admin/blogs/:id  — delete
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
