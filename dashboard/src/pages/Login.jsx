import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan mb-4 animate-pulse">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" fill="none" />
              <path d="M35 50C35 41.716 41.716 35 50 35C58.284 35 65 41.716 65 50" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="50" r="10" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-cyan bg-clip-text text-transparent font-display">
            CogniDrift
          </h1>
          <p className="text-slate-500 mt-2">Admin Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Lock size={14} className="inline mr-2" />
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input pr-12 text-center tracking-widest text-lg"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg animate-fade-in">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Access Dashboard
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400">
            Protected by CogniDrift Security
          </p>
        </div>
      </div>
    </div>
  );
}
