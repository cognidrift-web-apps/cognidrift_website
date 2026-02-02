import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCallbacks } from '../api';
import {
  PhoneCall,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'completed', label: 'Completed' },
  { key: 'failed', label: 'Failed' },
];

const getStatusBadge = (status) => {
  const badges = {
    scheduled: (
      <span className="badge badge-blue">
        <Calendar size={12} /> Scheduled
      </span>
    ),
    completed: (
      <span className="badge badge-green">
        <CheckCircle size={12} /> Completed
      </span>
    ),
    failed: (
      <span className="badge badge-red">
        <XCircle size={12} /> Failed
      </span>
    ),
    cancelled: (
      <span className="badge badge-gray">
        <AlertCircle size={12} /> Cancelled
      </span>
    ),
  };
  return badges[status] || <span className="badge badge-gray">{status}</span>;
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
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

export default function Callbacks() {
  const [callbacks, setCallbacks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCallbacks();
  }, [filter, pagination.page]);

  const loadCallbacks = async () => {
    setLoading(true);
    try {
      const data = await getCallbacks(filter, pagination.page, 10);
      if (data.success) {
        setCallbacks(data.callbacks);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error loading callbacks:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Callbacks</h1>
        <p className="text-slate-500 mt-1">Scheduled and completed callback requests</p>
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">All Callbacks</h3>
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
                <th className="table-header">Scheduled For</th>
                <th className="table-header">Reason</th>
                <th className="table-header">Status</th>
                <th className="table-header">Created</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="table-cell"><div className="skeleton h-5 w-28" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-36" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-20" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-10" /></td>
                  </tr>
                ))
              ) : callbacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-cell text-center text-slate-400 py-12">
                    <PhoneCall size={48} className="mx-auto mb-4 opacity-50" />
                    No callbacks found
                  </td>
                </tr>
              ) : (
                callbacks.map((callback) => (
                  <tr key={callback._id} className="hover:bg-slate-50">
                    <td className="table-cell font-mono text-sm">{callback.phoneNumber}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {formatDateTime(callback.datetime)}
                      </div>
                    </td>
                    <td className="table-cell">{callback.reason || '-'}</td>
                    <td className="table-cell">{getStatusBadge(callback.status)}</td>
                    <td className="table-cell text-slate-500 text-sm">
                      <Clock size={14} className="inline mr-1" />
                      {formatTimeAgo(callback.createdAt)}
                    </td>
                    <td className="table-cell">
                      <Link
                        to={`/dashboard/conversations?phone=${callback.phoneNumber}`}
                        className="btn-ghost p-2"
                        title="View Conversation"
                      >
                        <MessageSquare size={16} />
                      </Link>
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
    </div>
  );
}
