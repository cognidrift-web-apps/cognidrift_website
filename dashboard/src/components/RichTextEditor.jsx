import { useEffect, useRef, useCallback } from 'react'
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Link, Heading2, Heading3, Quote, Minus
} from 'lucide-react'

// Toolbar button
function Btn({ title, onClick, active, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
      className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
        active
          ? 'bg-primary-600 text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )
}

// Divider
function Sep() {
  return <div className="w-px h-6 bg-slate-200 mx-1" />
}

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null)

  // Sync incoming value → editor (only on mount or when value comes from outside)
  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (el.innerHTML !== value) {
      el.innerHTML = value || ''
    }
  }, [value])

  const exec = useCallback((command, val = null) => {
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    // Emit updated HTML
    onChange(editorRef.current?.innerHTML || '')
  }, [onChange])

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '')
  }

  const insertLink = () => {
    const url = prompt('Enter URL:', 'https://')
    if (url) exec('createLink', url)
  }

  const insertHr = () => {
    exec('insertHTML', '<hr style="border:none;border-top:1px solid #e2e8f0;margin:1.5rem 0"/>')
  }

  const formatBlock = (tag) => exec('formatBlock', tag)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
        {/* Headings */}
        <Btn title="Heading 2" onClick={() => formatBlock('h2')}><Heading2 size={15} /></Btn>
        <Btn title="Heading 3" onClick={() => formatBlock('h3')}><Heading3 size={15} /></Btn>
        <Btn title="Paragraph" onClick={() => formatBlock('p')}>
          <span className="text-xs font-semibold">P</span>
        </Btn>

        <Sep />

        {/* Formatting */}
        <Btn title="Bold (Ctrl+B)" onClick={() => exec('bold')}><Bold size={14} /></Btn>
        <Btn title="Italic (Ctrl+I)" onClick={() => exec('italic')}><Italic size={14} /></Btn>
        <Btn title="Underline (Ctrl+U)" onClick={() => exec('underline')}><Underline size={14} /></Btn>
        <Btn title="Strikethrough" onClick={() => exec('strikeThrough')}><Strikethrough size={14} /></Btn>

        <Sep />

        {/* Lists */}
        <Btn title="Bullet List" onClick={() => exec('insertUnorderedList')}><List size={15} /></Btn>
        <Btn title="Numbered List" onClick={() => exec('insertOrderedList')}><ListOrdered size={15} /></Btn>

        <Sep />

        {/* Alignment */}
        <Btn title="Align Left" onClick={() => exec('justifyLeft')}><AlignLeft size={14} /></Btn>
        <Btn title="Align Center" onClick={() => exec('justifyCenter')}><AlignCenter size={14} /></Btn>
        <Btn title="Align Right" onClick={() => exec('justifyRight')}><AlignRight size={14} /></Btn>

        <Sep />

        {/* Extras */}
        <Btn title="Blockquote" onClick={() => formatBlock('blockquote')}><Quote size={14} /></Btn>
        <Btn title="Insert Link" onClick={insertLink}><Link size={14} /></Btn>
        <Btn title="Horizontal Rule" onClick={insertHr}><Minus size={14} /></Btn>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[280px] max-h-[500px] overflow-y-auto p-4 text-sm text-slate-700 focus:outline-none rich-editor"
        style={{ lineHeight: '1.75' }}
      />

      {/* Styles for rendered content inside editor */}
      <style>{`
        .rich-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; color: #1e293b; }
        .rich-editor h3 { font-size: 1.15rem; font-weight: 600; margin: 0.75rem 0 0.4rem; color: #334155; }
        .rich-editor p  { margin-bottom: 0.75rem; }
        .rich-editor ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .rich-editor ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .rich-editor li { margin-bottom: 0.25rem; }
        .rich-editor blockquote {
          border-left: 4px solid #2563eb;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          background: #f8fafc;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #475569;
          font-style: italic;
        }
        .rich-editor a { color: #2563eb; text-decoration: underline; }
        .rich-editor strong { font-weight: 600; }
      `}</style>
    </div>
  )
}
