import { useState } from 'react';
import { updatePassword } from '../api';
import {
  Save,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Server,
  Database,
  Code,
  Loader2
} from 'lucide-react';

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);

    try {
      const data = await updatePassword(currentPassword, newPassword);

      if (data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update password' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error updating password'
      });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your dashboard settings</p>
      </div>

      {/* Password Change */}
      <div className="card">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Lock size={18} />
            Change Password
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="form-input pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="form-input"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="form-input"
              required
            />
          </div>

          {message.text && (
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm
                ${message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
                }`}
            >
              {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* System Info */}
      <div className="card">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">System Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Server size={18} className="text-slate-500" />
              <span className="text-slate-600">Server Status</span>
            </div>
            <span className="badge badge-green">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Online
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Database size={18} className="text-slate-500" />
              <span className="text-slate-600">Database</span>
            </div>
            <span className="badge badge-green">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Code size={18} className="text-slate-500" />
              <span className="text-slate-600">API Version</span>
            </div>
            <span className="font-mono text-sm text-slate-700">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* API Configuration Info */}
      <div className="card">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">API Configuration</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            The dashboard connects to your backend API. Set the <code className="bg-slate-100 px-2 py-1 rounded text-primary-600">VITE_API_URL</code> environment variable to configure the API endpoint.
          </p>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-300">
            <span className="text-emerald-400">VITE_API_URL</span>=https://your-backend.railway.app
          </div>
        </div>
      </div>
    </div>
  );
}
