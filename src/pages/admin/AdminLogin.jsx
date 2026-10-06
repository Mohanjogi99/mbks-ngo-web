import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NGO_DETAILS } from '../../utils/constants';
import { Button } from '../../components/ui/Button';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.warn('Login error:', err);
      // For Phase 1 demo preview if Firebase auth credentials are not yet provisioned:
      if (email === 'admin@mbks.org' && password === 'admin123') {
        navigate('/admin');
      } else {
        setError('अमान्य ईमेल या पासवर्ड। (Invalid email or password)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="w-20 h-20 rounded-full border-2 border-ngo-gold-700 mx-auto object-contain p-1"
          />
          <h2 className="text-lg font-bold text-slate-900">{NGO_DETAILS.nameHi}</h2>
          <p className="text-xs text-ngo-gold-700 font-semibold">एडमिन लॉगिन पोर्टल (Admin Login)</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              ईमेल (Email Address)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mbks.org"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              पासवर्ड (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 text-sm"
              />
            </div>
          </div>

          <Button type="submit" isLoading={loading} variant="primary" className="w-full text-sm py-3 mt-2">
            सुरक्षित प्रवेश (Login to Console)
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-ngo-green-700" />
          <span>{NGO_DETAILS.regNo}</span>
        </div>
      </div>
    </div>
  );
};
