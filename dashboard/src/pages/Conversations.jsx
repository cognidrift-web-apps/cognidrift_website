import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getConversations, getConversation } from '../api';
import {
  MessageSquare,
  Clock,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Bot,
  Phone,
  Mail,
  Tag
} from 'lucide-react';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'call_requested', label: 'Call Requested' },
  { key: 'completed', label: 'Completed' },
];

const getStatusBadge = (status) => {
  const badges = {
    active: <span className="badge badge-green"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Active</span>,
    call_requested: <span className="badge badge-purple"><span className="w-2 h-2 bg-purple-500 rounded-full" /> Call Requested</span>,
    completed: <span className="badge badge-blue"><span className="w-2 h-2 bg-primary-500 rounded-full" /> Completed</span>,
  };
  return badges[status] || <span className="badge badge-gray">{status}</span>;
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return date.toLocaleDateString();
};

export default function Conversations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    loadConversations();
  }, [filter, pagination.page]);

  useEffect(() => {
    const phone = searchParams.get('phone');
    if (phone) {
      openConversation(phone);
      setSearchParams({});
    }
  }, [searchParams]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const data = await getConversations(filter, pagination.page, 10);
      if (data.success) {
        setConversations(data.conversations);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
    setLoading(false);
  };

  const openConversation = async (phoneNumber) => {
    setModalOpen(true);
    setModalLoading(true);
    try {
      const data = await getConversation(phoneNumber);
      if (data.success) {
        setSelectedConv(data.conversation);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
    setModalLoading(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedConv(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Conversations</h1>
        <p className="text-slate-500 mt-1">View and manage all SMS conversations</p>
      </div>

      {/* Filters & Table */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">All Conversations</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setFilter(key);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className={`btn-ghost text-sm ${filter === key ? 'bg-primary-50 text-primary-600' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Phone Number</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Status</th>
                <th className="table-header">Messages</th>
                <th className="table-header">Last Active</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="table-cell"><div className="skeleton h-5 w-32" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-20" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-10" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-10" /></td>
                  </tr>
                ))
              ) : conversations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-cell text-center text-slate-400 py-12">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    No conversations found
                  </td>
                </tr>
              ) : (
                conversations.map((conv) => (
                  <tr key={conv._id} className="hover:bg-slate-50">
                    <td className="table-cell font-mono text-sm">{conv.phoneNumber}</td>
                    <td className="table-cell">{conv.metadata?.customerName || '-'}</td>
                    <td className="table-cell">{getStatusBadge(conv.status)}</td>
                    <td className="table-cell">{conv.messages?.length || 0}</td>
                    <td className="table-cell text-slate-500 text-sm">
                      <Clock size={14} className="inline mr-1" />
                      {formatTimeAgo(conv.lastMessageAt)}
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => openConversation(conv.phoneNumber)}
                        className="btn-ghost p-2"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-100">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
              className="btn-ghost p-2 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setPagination(prev => ({ ...prev, page }))}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
                  ${pagination.page === page
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {page}
              </button>
            ))}
            {pagination.totalPages > 5 && (
              <>
                <span className="text-slate-400">...</span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: pagination.totalPages }))}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
                    ${pagination.page === pagination.totalPages
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {pagination.totalPages}
                </button>
              </>
            )}
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
              className="btn-ghost p-2 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Conversation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-fade-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-semibold text-lg text-slate-800">
                Conversation Details
              </h3>
              <button onClick={closeModal} className="btn-ghost p-2">
                <X size={20} />
              </button>
            </div>

            {modalLoading ? (
              <div className="p-6 space-y-4">
                <div className="skeleton h-20 w-full" />
                <div className="skeleton h-40 w-full" />
              </div>
            ) : selectedConv && (
              <>
                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                      <Phone size={12} /> Phone
                    </div>
                    <div className="font-mono font-medium">{selectedConv.phoneNumber}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-1">Status</div>
                    <div>{getStatusBadge(selectedConv.status)}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                      <User size={12} /> Customer
                    </div>
                    <div className="font-medium">{selectedConv.metadata?.customerName || 'Unknown'}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                      <Tag size={12} /> Interest
                    </div>
                    <div className="font-medium">{selectedConv.metadata?.interest || '-'}</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="px-6 pb-6">
                  <h4 className="font-semibold text-slate-800 mb-4">Messages</h4>
                  <div className="bg-slate-50 rounded-xl p-4 max-h-60 overflow-y-auto space-y-3">
                    {selectedConv.messages?.length === 0 ? (
                      <p className="text-center text-slate-400">No messages</p>
                    ) : (
                      selectedConv.messages?.map((msg, i) => (
                        <div
                          key={i}
                          className={`chat-message ${msg.role}`}
                        >
                          <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                            {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                            {msg.role === 'user' ? 'Customer' : 'AI'}
                          </div>
                          {msg.content}
                          <div className="text-xs opacity-50 mt-1">
                            {formatTimeAgo(msg.timestamp)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-slate-100 bg-slate-50">
              <button onClick={closeModal} className="btn-ghost">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
