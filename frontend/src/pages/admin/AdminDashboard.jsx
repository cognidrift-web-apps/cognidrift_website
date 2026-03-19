import { useState, useEffect, useCallback } from 'react'
import {
  LogIn, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  FileText, CheckCircle, Clock, AlertCircle, X, Save, RefreshCw
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || ''

// ─── helpers ─────────────────────────────────────────────────────────────────

function authHeader(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

function fmt(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const CATEGORIES = [
  'AI & Technology', 'Healthcare', 'Real Estate', 'Business Strategy',
  'Implementation', 'Security & Compliance', 'Customer Service', 'Other'
]

const EMPTY_FORM = {
  title: '', excerpt: '', content: '', author: '', authorRole: '',
  category: '', image: '', readTime: '5 min read', status: 'draft', tags: ''
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/dashboard/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Invalid password')
      onLogin(data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" strokeWidth="2" />
              <path strokeWidth="2" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">CogniDrift</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2" />
                <path strokeWidth="2" d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Admin Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 text-gray-700"
              />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">Protected by CogniDrift Security</p>
      </div>
    </div>
  )
}

// ─── Blog Form Modal ──────────────────────────────────────────────────────────

function BlogFormModal({ token, editId, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editId) {
      setLoading(true)
      fetch(`${API_BASE}/api/admin/blogs/${editId}`, { headers: authHeader(token) })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            const b = data.blog
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
            })
          }
        })
        .catch(() => setError('Failed to load post'))
        .finally(() => setLoading(false))
    }
  }, [editId, token])

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function handleSave() {
    setError('')
    if (!form.title || !form.excerpt || !form.content || !form.author || !form.category) {
      setError('Title, excerpt, content, author, and category are required.')
      return
    }
    setSaving(true)
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    }
    try {
      const url = editId ? `${API_BASE}/api/admin/blogs/${editId}` : `${API_BASE}/api/admin/blogs`
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: authHeader(token), body: JSON.stringify(payload) })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">{editId ? 'Edit Blog Post' : 'New Blog Post'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Enter blog title..." />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
                placeholder="Short description shown in blog listing..." />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content * <span className="text-gray-400 font-normal">(HTML supported)</span></label>
              <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={12}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm font-mono resize-y"
                placeholder="<p>Write your blog content here. HTML tags are supported.</p>&#10;<h2>Section Title</h2>&#10;<p>More content...</p>" />
            </div>

            {/* Row: Author + AuthorRole */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                <input value={form.author} onChange={e => set('author', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Author name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
                <input value={form.authorRole} onChange={e => set('authorRole', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="e.g. AI Technology Analyst" />
              </div>
            </div>

            {/* Row: Category + ReadTime */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white">
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                <input value={form.readTime} onChange={e => set('readTime', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="e.g. 8 min read" />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input value={form.image} onChange={e => set('image', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="https://..." />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="AI, healthcare, automation" />
            </div>

            {/* Status toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <button
                onClick={() => set('status', form.status === 'published' ? 'draft' : 'published')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  form.status === 'published'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {form.status === 'published' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {form.status === 'published' ? 'Published' : 'Draft'}
              </button>
              <span className="text-xs text-gray-400">(click to toggle)</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium text-sm">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirm({ title, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Delete Post</h3>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-medium text-sm">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60">
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Blog Table ───────────────────────────────────────────────────────────────

function BlogTable({ token, onNew }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  const load = useCallback(() => {
    setLoading(true)
    fetch(`${API_BASE}/api/admin/blogs`, { headers: authHeader(token) })
      .then(r => r.json())
      .then(data => { if (data.success) setBlogs(data.blogs) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => { load() }, [load])

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs/${deleteTarget._id}`, {
        method: 'DELETE', headers: authHeader(token)
      })
      const data = await res.json()
      if (data.success) { setDeleteTarget(null); load() }
    } catch {/**/} finally { setDeleting(false) }
  }

  const filtered = filterStatus === 'all' ? blogs : blogs.filter(b => b.status === filterStatus)

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    draft: blogs.filter(b => b.status === 'draft').length
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Posts', value: stats.total, icon: FileText, color: 'blue' },
          { label: 'Published', value: stats.published, icon: CheckCircle, color: 'green' },
          { label: 'Drafts', value: stats.draft, icon: Clock, color: 'yellow' }
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-${s.color}-50`}>
              <s.icon className={`w-5 h-5 text-${s.color}-600`} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {['all', 'published', 'draft'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                  filterStatus === s ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}>{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={load} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Refresh">
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
            <button onClick={onNew}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FileText className="w-12 h-12 mb-3 opacity-30" />
            <p className="font-medium">No blog posts yet</p>
            <p className="text-sm mt-1">Click "New Post" to create your first blog post</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(blog => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800 max-w-xs truncate">{blog.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{blog.readTime}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-700">{blog.author}</div>
                      {blog.authorRole && <div className="text-xs text-gray-400">{blog.authorRole}</div>}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        blog.status === 'published'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {blog.status === 'published'
                          ? <CheckCircle className="w-3 h-3" />
                          : <Clock className="w-3 h-3" />}
                        {blog.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{fmt(blog.createdAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {blog.status === 'published' && (
                          <a href={`/resources/blog/${blog.slug}`} target="_blank" rel="noreferrer"
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-blue-500" />
                          </a>
                        )}
                        <button onClick={() => setEditId(blog._id)}
                          className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit">
                          <Pencil className="w-4 h-4 text-yellow-600" />
                        </button>
                        <button onClick={() => setDeleteTarget(blog)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {(editId || editId === 'new') && (
        <BlogFormModal token={token} editId={editId === 'new' ? null : editId}
          onClose={() => setEditId(null)}
          onSaved={() => { setEditId(null); load() }} />
      )}

      {deleteTarget && (
        <DeleteConfirm title={deleteTarget.title} loading={deleting}
          onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('cd_admin_token') || '')
  const [showNew, setShowNew] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  function handleLogin(t) {
    sessionStorage.setItem('cd_admin_token', t)
    setToken(t)
  }

  function handleLogout() {
    sessionStorage.removeItem('cd_admin_token')
    setToken('')
  }

  if (!token) return <LoginScreen onLogin={handleLogin} />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-gray-800">CogniDrift</span>
              <span className="text-gray-400 text-sm ml-2">Admin</span>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
            <p className="text-gray-500 text-sm mt-1">Create, edit and publish blog posts</p>
          </div>
        </div>

        <BlogTable
          key={refreshKey}
          token={token}
          onNew={() => setShowNew(true)}
        />
      </main>

      {showNew && (
        <BlogFormModal token={token} editId={null}
          onClose={() => setShowNew(false)}
          onSaved={() => { setShowNew(false); setRefreshKey(k => k + 1) }} />
      )}
    </div>
  )
}
