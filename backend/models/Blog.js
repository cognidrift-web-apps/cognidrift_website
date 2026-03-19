import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  authorRole: { type: String, default: '', trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, default: 'https://placehold.co/800x450/2563eb/ffffff?text=Blog+Post' },
  readTime: { type: String, default: '5 min read' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  tags: [{ type: String }]
}, { timestamps: true });

blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ slug: 1 });

export default mongoose.model('Blog', blogSchema);
