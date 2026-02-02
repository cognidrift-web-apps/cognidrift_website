import { useState, useEffect } from 'react';
import { getCustomers } from '../api';
import {
  Users,
  Search,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, [pagination.page]);

  const loadCustomers = async (searchQuery = search) => {
    setLoading(true);
    try {
      const data = await getCustomers(searchQuery, pagination.page, 10);
      if (data.success) {
        setCustomers(data.customers);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPagination(prev => ({ ...prev, page: 1 }));
      loadCustomers(search);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
        <p className="text-slate-500 mt-1">All captured customer information</p>
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">All Customers</h3>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="form-input pl-10 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Phone</th>
                <th className="table-header">Email</th>
                <th className="table-header">Interest</th>
                <th className="table-header">Source</th>
                <th className="table-header">Created</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="table-cell"><div className="skeleton h-5 w-24" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-28" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-32" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-20" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-16" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-20" /></td>
                    <td className="table-cell"><div className="skeleton h-5 w-10" /></td>
                  </tr>
                ))
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-cell text-center text-slate-400 py-12">
                    <Users size={48} className="mx-auto mb-4 opacity-50" />
                    No customers found
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-slate-50">
                    <td className="table-cell font-medium">{customer.name || '-'}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2 font-mono text-sm">
                        <Phone size={14} className="text-slate-400" />
                        {customer.phoneNumber}
                      </div>
                    </td>
                    <td className="table-cell">
                      {customer.email ? (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-slate-400" />
                          {customer.email}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="table-cell">
                      {customer.interest ? (
                        <span className="badge badge-cyan">{customer.interest}</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-gray">{customer.source || 'phone_call'}</span>
                    </td>
                    <td className="table-cell text-slate-500 text-sm">
                      <Clock size={14} className="inline mr-1" />
                      {formatTimeAgo(customer.createdAt)}
                    </td>
                    <td className="table-cell">
                      <Link
                        to={`/dashboard/conversations?phone=${customer.phoneNumber}`}
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
