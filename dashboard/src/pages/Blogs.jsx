import { useState, useEffect } from 'react';
import {
  getAdminBlogs,
  getAdminBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from '../api';
import RichTextEditor from '../components/RichTextEditor';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  X,
  Save,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const CATEGORIES = [
  'AI & Technology', 'Healthcare', 'Real Estate', 'Business Strategy',
  'Implementation', 'Security & Compliance', 'Customer Service', 'Other'
];

const EMPTY_FORM = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  authorRole: '',
  category: '',
  image: '',
  readTime: '5 min read',
  status: 'draft',
  tags: ''
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

// ─── Blog Form Modal ──────────────────────────────────────────────────────────

function BlogFormModal({ editId, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editId) {
      setLoading(true);
      getAdminBlogById(editId)
        .then(data => {
          if (data.success) {
            const b = data.blog;
            setForm({
              title: b.title || '',
              excerpt: b.excerpt || '',
              content: b.content || '',
              author: b.author || '',
              authorRole: b.authorRole || '',
              category: b.category || '',
              image: b.image || '',
              readTime: b.readTime || '5 min read',
              status: b.status || 'draft',
              tags: Array.isArray(b.tags) ? b.tags.join(', ') : ''
            });
          }
        })
        .catch(() => setError('Failed to load blog post.'))
        .finally(() => setLoading(false));
    }
  }, [editId]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    setError('');
    if (!form.title || !form.excerpt || !form.content || !form.author || !form.category) {
      setError('Title, excerpt, content, author, and category are required.');
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };
    try {
      if (editId) {
        await updateBlog(editId, payload);
      } else {
        await createBlog(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {editId ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <button onClick={onClose} className="btn-ghost p-2">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={24} className="animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                className="form-input w-full"
                placeholder="Enter blog title..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)}
                rows={2}
                className="form-input w-full resize-none"
                placeholder="Short description shown in blog listing..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={form.content}
                onChange={val => set('content', val)}
              />
            </div>

            {/* Author + AuthorRole */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={e => set('author', e.target.value)}
                  className="form-input w-full"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Author Role</label>
                <input
                  type="text"
                  value={form.authorRole}
                  onChange={e => set('authorRole', e.target.value)}
                  className="form-input w-full"
                  placeholder="e.g. AI Technology Analyst"
                />
              </div>
            </div>

            {/* Category + ReadTime */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  className="form-input w-full"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Read Time</label>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={e => set('readTime', e.target.value)}
                  className="form-input w-full"
                  placeholder="e.g. 8 min read"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={e => set('image', e.target.value)}
                className="form-input w-full"
                placeholder="https://..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Tags <span className="text-slate-400 font-normal">(comma separated)</span>
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                className="form-input w-full"
                placeholder="AI, healthcare, automation"
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Status:</span>
              <button
                type="button"
                onClick={() => set('status', form.status === 'published' ? 'draft' : 'published')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
                  form.status === 'published'
                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {form.status === 'published'
                  ? <CheckCircle size={14} />
                  : <Clock size={14} />}
                {form.status === 'published' ? 'Published' : 'Draft'}
              </button>
              <span className="text-xs text-slate-400">Click to toggle</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button onClick={onClose} className="btn-ghost px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 btn-primary px-5 py-2 text-sm disabled:opacity-60"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({ title, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Delete Post</h3>
        </div>
        <p className="text-slate-500 text-sm mb-6">
          Are you sure you want to delete <strong className="text-slate-700">"{title}"</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-ghost py-2.5 text-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Blogs Page ──────────────────────────────────────────────────────────

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAdminBlogs();
      if (data.success) setBlogs(data.blogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
    setLoading(false);
  };

  useEffect(() => { loadBlogs(); }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteBlog(deleteTarget._id);
      setDeleteTarget(null);
      loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
    setDeleting(false);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditId(null);
    loadBlogs();
  };

  const filtered = filterStatus === 'all' ? blogs : blogs.filter(b => b.status === filterStatus);

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    draft: blogs.filter(b => b.status === 'draft').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Blog Posts</h1>
          <p className="text-slate-500 mt-1">Create and manage blog content for the website</p>
        </div>
        <button
          onClick={() => { setEditId(null); setShowForm(true); }}
          className="btn-primary flex items-center gap-2 px-4 py-2.5"
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Posts', value: stats.total, icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Published', value: stats.published, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Drafts', value: stats.draft, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' }
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {['all', 'published', 'draft'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                  filterStatus === s
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {s} {s === 'all' ? `(${stats.total})` : s === 'published' ? `(${stats.published})` : `(${stats.draft})`}
              </button>
            ))}
          </div>
          <button onClick={loadBlogs} className="btn-ghost p-2" title="Refresh">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Title</th>
                <th className="table-header">Category</th>
                <th className="table-header">Author</th>
                <th className="table-header">Status</th>
                <th className="table-header">Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="table-cell"><div className="skeleton h-5 w-48" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-28" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-20" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-20" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-cell text-center text-slate-400 py-16">
                    <FileText size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-medium">No blog posts found</p>
                    <p className="text-sm mt-1">
                      {filterStatus !== 'all'
                        ? `No ${filterStatus} posts. Try switching the filter.`
                        : 'Click "New Post" to create your first blog post.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map(blog => (
                  <tr key={blog._id} className="hover:bg-slate-50">
                    <td className="table-cell">
                      <div className="font-medium text-slate-800 max-w-xs truncate">{blog.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{blog.readTime}</div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-cyan">{blog.category}</span>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm text-slate-700">{blog.author}</div>
                      {blog.authorRole && (
                        <div className="text-xs text-slate-400">{blog.authorRole}</div>
                      )}
                    </td>
                    <td className="table-cell">
                      {blog.status === 'published' ? (
                        <span className="flex items-center gap-1.5 w-fit badge bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle size={12} /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 w-fit badge bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <Clock size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="table-cell text-slate-500 text-sm whitespace-nowrap">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        {blog.status === 'published' && (
                          <a
                            href={`${import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}/resources/blog/${blog.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-ghost p-2"
                            title="View on site"
                          >
                            <Eye size={16} className="text-primary-500" />
                          </a>
                        )}
                        <button
                          onClick={() => { setEditId(blog._id); setShowForm(true); }}
                          className="btn-ghost p-2"
                          title="Edit"
                        >
                          <Pencil size={16} className="text-yellow-600" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(blog)}
                          className="btn-ghost p-2"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <BlogFormModal
          editId={editId}
          onClose={() => { setShowForm(false); setEditId(null); }}
          onSaved={handleSaved}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
