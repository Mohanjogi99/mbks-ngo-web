import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NGO_DETAILS } from '../utils/constants';
import { LayoutDashboard, FolderKanban, Calendar, Users, Heart, Image, FileText, Settings, LogOut, ArrowLeft, Menu, X, ShieldCheck } from 'lucide-react';
import { ErrorBoundary } from '../components/ui/ErrorState';
import { FullPageLoader } from '../components/ui/Loading';

export const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  if (loading) {
    return <FullPageLoader message="ऑथेंटिकेशन की जांच हो रही है... / Verifying Authentication..." />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { path: '/admin/events', label: 'Events', icon: Calendar },
    { path: '/admin/volunteers', label: 'Volunteers', icon: Users },
    { path: '/admin/donations', label: 'Donations', icon: Heart },
    { path: '/admin/gallery', label: 'Gallery', icon: Image },
    { path: '/admin/reports', label: 'Reports', icon: FileText },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans text-slate-800">
      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-ngo-green-950 text-white flex flex-col justify-between shrink-0 shadow-2xl transition-transform duration-300 ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-5 border-b border-emerald-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="MBKS Logo"
                className="w-10 h-10 rounded-full border-2 border-ngo-gold-500 bg-white object-contain p-0.5"
              />
              <div>
                <h2 className="text-xs font-bold leading-tight line-clamp-1">
                  {NGO_DETAILS.nameHi}
                </h2>
                <span className="text-[10px] text-ngo-gold-500 font-bold uppercase tracking-wider block mt-0.5">
                  Admin Console
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="md:hidden p-1 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-ngo-green-700 text-white shadow-md border-l-4 border-ngo-gold-500'
                        : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-emerald-900/80 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xs text-emerald-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Website</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-red-300 hover:text-white px-3 py-2 rounded-lg hover:bg-red-900/50 transition-colors font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/90 h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>MBKS Management Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 hidden xs:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-ngo-green-700" />
              <span>Super Admin</span>
            </span>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};
