import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { getStats, getConversations } from '../api';
import {
  MessageSquare,
  Zap,
  PhoneCall,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  Eye
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatCard = ({ icon: Icon, label, value, change, color, loading }) => (
  <div className="stat-card">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon size={24} />
    </div>
    {loading ? (
      <div className="skeleton h-8 w-20 mb-2" />
    ) : (
      <div className="text-3xl font-bold text-slate-800">{value?.toLocaleString() || 0}</div>
    )}
    <div className="text-sm text-slate-500 mt-1">{label}</div>
    {change && (
      <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
        <TrendingUp size={14} />
        <span>{change}</span>
      </div>
    )}
  </div>
);

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

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(7);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, convData] = await Promise.all([
        getStats(period),
        getConversations('all', 1, 5)
      ]);

      if (statsData.success) setStats(statsData.stats);
      if (convData.success) setConversations(convData.conversations);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const lineChartData = {
    labels: stats?.conversationsByDay?.map(d => d.date) || [],
    datasets: [{
      label: 'Conversations',
      data: stats?.conversationsByDay?.map(d => d.count) || [],
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2563EB',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8' }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#E2E8F0' },
        ticks: { color: '#94A3B8' }
      }
    }
  };

  const donutChartData = {
    labels: ['Scheduled', 'Completed', 'Failed'],
    datasets: [{
      data: [
        stats?.callbacksByStatus?.scheduled || 0,
        stats?.callbacksByStatus?.completed || 0,
        stats?.callbacksByStatus?.failed || 0
      ],
      backgroundColor: ['#2563EB', '#10B981', '#EF4444'],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  const donutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Monitor your AI conversations and callbacks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={MessageSquare}
          label="Total Conversations"
          value={stats?.totalConversations}
          change="+12% this week"
          color="bg-primary-100 text-primary-600"
          loading={loading}
        />
        <StatCard
          icon={Zap}
          label="Active Chats"
          value={stats?.activeConversations}
          change="Live now"
          color="bg-cyan-100 text-cyan-600"
          loading={loading}
        />
        <StatCard
          icon={PhoneCall}
          label="Scheduled Callbacks"
          value={stats?.scheduledCallbacks}
          color="bg-purple-100 text-purple-600"
          loading={loading}
        />
        <StatCard
          icon={Users}
          label="Customers Captured"
          value={stats?.totalCustomers}
          change="+8% this week"
          color="bg-emerald-100 text-emerald-600"
          loading={loading}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Conversations Over Time</h3>
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="form-input w-auto py-2 px-3 text-sm"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
          <div className="p-6 h-80">
            {loading ? (
              <div className="skeleton w-full h-full" />
            ) : (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="card">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Callback Status</h3>
          </div>
          <div className="p-6 flex flex-col items-center">
            {loading ? (
              <div className="skeleton w-48 h-48 rounded-full" />
            ) : (
              <div className="w-48 h-48">
                <Doughnut data={donutChartData} options={donutChartOptions} />
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary-600 rounded-full" />
                <span className="text-sm text-slate-600">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-sm text-slate-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-slate-600">Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Conversations */}
      <div className="card">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Recent Conversations</h3>
          <Link to="/dashboard/conversations" className="btn-ghost text-sm">
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Phone Number</th>
                <th className="table-header">Status</th>
                <th className="table-header">Messages</th>
                <th className="table-header">Last Active</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="table-cell text-center">
                    <div className="skeleton h-6 w-48 mx-auto" />
                  </td>
                </tr>
              ) : conversations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-cell text-center text-slate-400">
                    No conversations yet
                  </td>
                </tr>
              ) : (
                conversations.map((conv) => (
                  <tr key={conv._id} className="hover:bg-slate-50">
                    <td className="table-cell font-mono text-sm">{conv.phoneNumber}</td>
                    <td className="table-cell">{getStatusBadge(conv.status)}</td>
                    <td className="table-cell">{conv.messages?.length || 0}</td>
                    <td className="table-cell text-slate-500 text-sm">
                      <Clock size={14} className="inline mr-1" />
                      {formatTimeAgo(conv.lastMessageAt)}
                    </td>
                    <td className="table-cell">
                      <Link
                        to={`/dashboard/conversations?phone=${conv.phoneNumber}`}
                        className="btn-ghost p-2"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
