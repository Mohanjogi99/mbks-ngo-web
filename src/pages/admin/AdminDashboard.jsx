import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { fetchAdminDashboardStats } from '../../services/adminService';
import { NGO_DETAILS } from '../../utils/constants';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  Heart,
  FileText,
  TrendingUp,
  Activity,
  RefreshCw,
  PlusCircle,
  Database,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    const data = await fetchAdminDashboardStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-ngo-green-700 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs font-semibold text-slate-600">
          Firestore डेटा लोड हो रहा है... / Loading Firestore Metrics...
        </p>
      </div>
    );
  }

  const statCards = [
    { labelHi: 'कुल परियोजनाएं', labelEn: 'Total Projects', val: stats.totalProjects, icon: FolderKanban, color: 'emerald' },
    { labelHi: 'जारी परियोजनाएं', labelEn: 'Ongoing Projects', val: stats.ongoingProjects, icon: Clock, color: 'amber' },
    { labelHi: 'पूर्ण परियोजनाएं', labelEn: 'Completed Projects', val: stats.completedProjects, icon: CheckCircle2, color: 'blue' },
    { labelHi: 'पंजीकृत स्वयंसेवक', labelEn: 'Total Volunteers', val: stats.totalVolunteers, icon: Users, color: 'purple' },
    { labelHi: 'शिविर एवं कार्यक्रम', labelEn: 'Total Events', val: stats.totalEvents, icon: Calendar, color: 'indigo' },
    { labelHi: 'कुल लाभार्थी', labelEn: 'Total Beneficiaries', val: `${stats.totalBeneficiaries.toLocaleString()}+`, icon: TrendingUp, color: 'teal' },
    { labelHi: 'प्राप्त सहयोग राशि', labelEn: 'Donations (₹)', val: `₹ ${stats.totalDonationsAmount.toLocaleString()}`, icon: Heart, color: 'red' },
    { labelHi: 'प्रकाशित समाचार', labelEn: 'Published News', val: stats.totalNews, icon: FileText, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gold" className="text-xs">
              <Database className="w-3.5 h-3.5 mr-1" />
              <span>Live Firestore Database</span>
            </Badge>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {NGO_DETAILS.nameHi} — ERP Dashboard
          </h2>
          <p className="text-xs text-emerald-200">
            {NGO_DETAILS.regNo} | Head Office: Nawagarh, Janjgir-Champa (C.G.)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadDashboardData}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Stats</span>
          </button>
        </div>
      </div>

      {/* Real Stats Cards Grid (8 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} hoverEffect={false} className="p-4 sm:p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider line-clamp-1">
                  {card.labelEn}
                </span>
                <div className="p-2 rounded-xl bg-ngo-green-50 text-ngo-green-700">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {card.val}
                </h3>
                <p className="text-[11px] text-ngo-green-800 font-semibold mt-0.5">
                  {card.labelHi}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Visual Analytics & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Chart Card */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-ngo-green-700" />
              <h3 className="text-base font-bold text-slate-900">
                Projects Distribution by Category Area
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Live Breakdown</span>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(stats.categoryCounts).map(([catName, count], idx) => {
              const percentage = Math.round((count / stats.totalProjects) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{catName}</span>
                    <span className="text-ngo-green-800">{count} Project(s) ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-ngo-green-700 to-ngo-gold-700 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-ngo-gold-700" />
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-2.5 pt-3">
              <NavLink to="/admin/projects" className="block">
                <Button variant="outline" size="sm" icon={FolderKanban} className="w-full text-xs justify-between">
                  <span>Manage Field Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </NavLink>

              <NavLink to="/admin/events" className="block">
                <Button variant="outline" size="sm" icon={Calendar} className="w-full text-xs justify-between">
                  <span>Create New Event / Drive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </NavLink>

              <NavLink to="/admin/volunteers" className="block">
                <Button variant="outline" size="sm" icon={Users} className="w-full text-xs justify-between">
                  <span>Review Volunteer Applications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </NavLink>

              <NavLink to="/admin/donations" className="block">
                <Button variant="outline" size="sm" icon={Heart} className="w-full text-xs justify-between">
                  <span>Record Offline / 80G Donation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </NavLink>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldAlert className="w-4 h-4 text-ngo-gold-700 shrink-0" />
            <span>Audited NoSQL Data Engine • Server Timestamp Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
