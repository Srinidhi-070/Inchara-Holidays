/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AdminDashboardStats,
  InquiryRecord,
  InquiryStatus,
  ServiceCategoryId,
} from '../../types/inquiry';
import { serviceCategories } from '../../data/servicesData';
import {
  adminLogin,
  adminLogout,
  getCurrentAdminUser,
  isAdminAuthenticated,
  fetchAdminStats,
  fetchAdminInquiries,
  updateInquiry,
  exportInquiriesToCsv,
  AdminUser,
} from '../../services/adminService';
import {
  LayoutDashboard,
  Inbox,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  Settings,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  X,
  Phone,
  Mail,
  Calendar,
  User,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  AlertCircle,
  Check,
} from 'lucide-react';
import { AmbariElephant, LotusIcon } from '../SouthIndianMotifs';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'dashboard' | 'inquiries' | 'followups' | 'services' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getCurrentAdminUser());

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@incharaholidays.com');
  const [loginPassword, setLoginPassword] = useState('Inchara@2026');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Dashboard Stats
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Inquiries List state
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Selected Inquiry for Detail Drawer
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editAssignedStaff, setEditAssignedStaff] = useState('');
  const [editFollowupDate, setEditFollowupDate] = useState('');
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState<string | null>(null);

  // Service Management State
  const [categoriesList, setCategoriesList] = useState(serviceCategories);

  // Load stats and inquiries when authenticated
  const loadDashboardData = async () => {
    setStatsLoading(true);
    setInquiriesLoading(true);
    try {
      const statsData = await fetchAdminStats();
      setStats(statsData);

      const inqData = await fetchAdminInquiries({
        search: searchQuery,
        status: statusFilter,
        category: categoryFilter,
      });
      setInquiries(inqData.inquiries);
    } catch (e) {
      console.warn('[Admin] Failed to load data:', e);
    } finally {
      setStatsLoading(false);
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadDashboardData();
    }
  }, [isOpen, isAuthenticated, statusFilter, categoryFilter]);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    const result = await adminLogin(loginEmail, loginPassword);
    setLoginLoading(false);

    if (result.success && result.user) {
      setIsAuthenticated(true);
      setCurrentUser(result.user);
      loadDashboardData();
    } else {
      setLoginError(result.error || 'Login failed.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    adminLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Open detail drawer for inquiry
  const handleOpenDetail = (inquiry: InquiryRecord) => {
    setSelectedInquiry(inquiry);
    setEditNotes(inquiry.internalNotes || '');
    setEditAssignedStaff(inquiry.assignedStaff || '');
    setEditFollowupDate(inquiry.nextFollowupDate || '');
    setUpdateSuccessMsg(null);
  };

  // Update Status
  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!selectedInquiry) return;
    setIsUpdatingStatus(true);
    setUpdateSuccessMsg(null);

    const updated = await updateInquiry(selectedInquiry.id, {
      status: newStatus,
      internalNotes: editNotes,
      assignedStaff: editAssignedStaff,
      nextFollowupDate: editFollowupDate || undefined,
    });

    setIsUpdatingStatus(false);
    if (updated) {
      setSelectedInquiry(updated);
      setUpdateSuccessMsg(`Status updated to "${newStatus}"`);
      // Update in local inquiries list
      setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      // Refresh stats
      fetchAdminStats().then(setStats);
    }
  };

  // Save Notes and Follow-up updates
  const handleSaveDetails = async () => {
    if (!selectedInquiry) return;
    setIsUpdatingStatus(true);

    const updated = await updateInquiry(selectedInquiry.id, {
      internalNotes: editNotes,
      assignedStaff: editAssignedStaff,
      nextFollowupDate: editFollowupDate || undefined,
    });

    setIsUpdatingStatus(false);
    if (updated) {
      setSelectedInquiry(updated);
      setUpdateSuccessMsg('Details saved successfully.');
      setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    }
  };

  // Export to CSV
  const handleExportCsv = () => {
    exportInquiriesToCsv(inquiries);
  };

  // Toggle Category Status
  const handleToggleCategory = (catId: ServiceCategoryId) => {
    setCategoriesList((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const getStatusBadge = (status: InquiryStatus) => {
    const config: Record<InquiryStatus, { bg: string; text: string; label: string }> = {
      new: { bg: 'bg-[#9E3D28]/15 border-[#9E3D28]/40', text: 'text-[#9E3D28]', label: 'New Lead' },
      contacted: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Contacted' },
      in_progress: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', label: 'In Progress' },
      proposal_sent: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', label: 'Proposal Sent' },
      confirmed: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Confirmed' },
      closed: { bg: 'bg-gray-100 border-gray-200', text: 'text-gray-700', label: 'Closed' },
      cancelled: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', label: 'Cancelled' },
    };
    const c = config[status] || config.new;
    return (
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-0 sm:p-4 overflow-hidden bg-[#0A1810]/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full h-full sm:h-[94dvh] max-w-7xl bg-[#F6F3EA] sm:rounded-3xl shadow-2xl border border-[#D4AF37]/35 flex flex-col overflow-hidden"
      >
        {/* Top Executive Header */}
        <header className="p-4 sm:px-6 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/25 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#263F32] border border-[#D4AF37]/40 flex items-center justify-center text-[#F5D77F]">
              <AmbariElephant className="w-6 h-6 text-[#F5D77F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-serif-editorial text-[#F6F3EA] tracking-tight">
                  Inchara Holidays — Operations & Enquiry Management
                </h1>
                <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#F5D77F] text-[10px] font-mono uppercase tracking-wider border border-[#D4AF37]/40">
                  Staff Admin v1.0
                </span>
              </div>
              <div className="text-xs text-[#E4D8C5]/75">
                {currentUser ? `Signed in as ${currentUser.fullName} (${currentUser.email})` : 'Authorized Staff Portal'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#F6F3EA] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-[#F5D77F]" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EA] transition-colors cursor-pointer"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Unauthenticated Login Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-kolam-subtle">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md p-8 rounded-3xl bg-white border border-[#D4AF37]/40 shadow-xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#162E22] text-[#F5D77F] flex items-center justify-center mx-auto shadow-md">
                  <Shield className="w-7 h-7 text-[#F5D77F]" />
                </div>
                <h2 className="text-2xl font-bold font-serif-editorial text-[#162E22]">
                  Staff Portal Sign In
                </h2>
                <p className="text-xs text-[#252923]/70">
                  Enter authorized credentials to view live inquiries and manage customer bookings.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-1">
                    Staff Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                    required
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-[#9E3D28]/10 border border-[#9E3D28]/30 text-xs text-[#9E3D28] font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>

              <div className="p-3 rounded-xl bg-[#F6F3EA] border border-[#263F32]/8 text-[11px] text-[#252923]/70 text-center">
                Default Demo Credentials: <span className="font-mono font-bold">admin@incharaholidays.com</span> / <span className="font-mono font-bold">Inchara@2026</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-[#162E22] text-[#F6F3EA] p-3 sm:p-4 border-r border-[#263F32]/30 flex md:flex-col gap-1 shrink-0 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                { id: 'inquiries', label: 'All Inquiries', icon: Inbox },
                { id: 'followups', label: 'Follow-ups', icon: Clock },
                { id: 'services', label: 'Services', icon: Layers },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] font-bold shadow-sm'
                        : 'text-[#F6F3EA]/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main Content Workspace */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* KPI Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        label: 'Total Inquiries',
                        val: stats?.totalInquiries ?? inquiries.length,
                        sub: 'Lifetime web leads',
                        icon: Inbox,
                        color: 'text-[#162E22]',
                      },
                      {
                        label: 'New Today',
                        val: stats?.newInquiriesToday ?? 1,
                        sub: 'Requires first touch',
                        icon: Sparkles,
                        color: 'text-[#9E3D28]',
                      },
                      {
                        label: 'Pending Follow-ups',
                        val: stats?.pendingFollowups ?? 2,
                        sub: 'Scheduled for action',
                        icon: Clock,
                        color: 'text-amber-800',
                      },
                      {
                        label: 'Converted Rate',
                        val: `${stats?.conversionRate ?? 25}%`,
                        sub: `${stats?.convertedCount ?? 1} Confirmed tours`,
                        icon: TrendingUp,
                        color: 'text-emerald-700',
                      },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-white border border-[#263F32]/12 shadow-xs flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between text-xs text-[#252923]/60 mb-2 font-medium">
                            <span>{card.label}</span>
                            <Icon className={`w-4 h-4 ${card.color}`} />
                          </div>
                          <div className={`text-2xl sm:text-3xl font-bold font-serif-editorial ${card.color}`}>
                            {card.val}
                          </div>
                          <div className="text-[11px] text-[#252923]/50 mt-1 font-normal">
                            {card.sub}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Category Breakdown Bar */}
                  <div className="p-6 rounded-3xl bg-white border border-[#263F32]/12 shadow-xs space-y-4">
                    <h3 className="text-base font-bold font-serif-editorial text-[#162E22]">
                      Inquiry Distribution by Service Category
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {serviceCategories.map((cat) => {
                        const count = stats?.byCategory[cat.id] || inquiries.filter((i) => i.serviceCategory === cat.id).length;
                        return (
                          <div
                            key={cat.id}
                            className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#263F32]/8 space-y-1"
                          >
                            <div className="text-[11px] font-bold text-[#162E22] truncate">{cat.titleEn}</div>
                            <div className="text-xl font-bold font-mono text-[#D4AF37]">{count}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Submissions Feed */}
                  <div className="p-6 rounded-3xl bg-white border border-[#263F32]/12 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold font-serif-editorial text-[#162E22]">
                        Recent Customer Inquiries
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('inquiries')}
                        className="text-xs font-bold text-[#9E3D28] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="divide-y divide-[#263F32]/8">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => handleOpenDetail(inq)}
                          className="py-3 flex items-center justify-between hover:bg-[#FBF8F1] px-2 rounded-xl transition-colors cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#162E22]">
                                {inq.referenceNumber}
                              </span>
                              {getStatusBadge(inq.status)}
                            </div>
                            <div className="text-sm font-semibold text-[#162E22]">
                              {inq.customerName} · <span className="font-mono text-xs text-[#252923]/60">{inq.phone}</span>
                            </div>
                            <div className="text-xs text-[#252923]/60">
                              {inq.serviceCategory} ({inq.serviceType})
                            </div>
                          </div>

                          <div className="text-right text-xs text-[#252923]/50">
                            {new Date(inq.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ALL INQUIRIES */}
              {(activeTab === 'inquiries' || activeTab === 'followups') && (
                <div className="space-y-4">
                  {/* Action & Filter Toolbar */}
                  <div className="p-4 rounded-2xl bg-white border border-[#263F32]/12 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                      {/* Search Input */}
                      <div className="relative min-w-[220px]">
                        <Search className="w-4 h-4 text-[#252923]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && loadDashboardData()}
                          placeholder="Search ref, name, phone..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden bg-[#FBF8F1]"
                        />
                      </div>

                      {/* Status Filter */}
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="py-2 px-3 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] bg-[#FBF8F1] focus:outline-hidden"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="proposal_sent">Proposal Sent</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="closed">Closed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      {/* Category Filter */}
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="py-2 px-3 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] bg-[#FBF8F1] focus:outline-hidden"
                      >
                        <option value="all">All Categories</option>
                        {serviceCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.titleEn}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={loadDashboardData}
                        className="p-2 rounded-xl border border-[#263F32]/15 text-[#162E22] hover:bg-[#F6F3EA] transition-colors cursor-pointer"
                        title="Refresh List"
                      >
                        <RefreshCw className={`w-4 h-4 ${inquiriesLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>

                    {/* Export CSV Button */}
                    <button
                      type="button"
                      onClick={handleExportCsv}
                      className="px-4 py-2 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {/* Inquiries Table */}
                  <div className="rounded-3xl bg-white border border-[#263F32]/12 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/25">
                            <th className="py-3.5 px-4 font-bold">Reference</th>
                            <th className="py-3.5 px-4 font-bold">Customer</th>
                            <th className="py-3.5 px-4 font-bold">Service Category</th>
                            <th className="py-3.5 px-4 font-bold">Status</th>
                            <th className="py-3.5 px-4 font-bold">Follow-up</th>
                            <th className="py-3.5 px-4 font-bold">Submitted (IST)</th>
                            <th className="py-3.5 px-4 font-bold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#263F32]/8">
                          {inquiries.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center py-12 text-[#252923]/60">
                                No inquiries match your current filters.
                              </td>
                            </tr>
                          ) : (
                            inquiries.map((inq) => (
                              <tr
                                key={inq.id}
                                className="hover:bg-[#FBF8F1] transition-colors cursor-pointer"
                                onClick={() => handleOpenDetail(inq)}
                              >
                                <td className="py-3.5 px-4 font-mono font-bold text-[#162E22]">
                                  {inq.referenceNumber}
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-[#162E22]">{inq.customerName}</div>
                                  <div className="text-[11px] font-mono text-[#252923]/60">{inq.phone}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-[#162E22]">{inq.serviceCategory}</div>
                                  <div className="text-[11px] text-[#252923]/60">{inq.serviceType}</div>
                                </td>
                                <td className="py-3.5 px-4">
                                  {getStatusBadge(inq.status)}
                                </td>
                                <td className="py-3.5 px-4">
                                  {inq.nextFollowupDate ? (
                                    <span className="font-mono text-[11px] text-[#9E3D28] font-semibold">
                                      {inq.nextFollowupDate}
                                    </span>
                                  ) : (
                                    <span className="text-[#252923]/40">—</span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 text-[#252923]/60">
                                  {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenDetail(inq);
                                    }}
                                    className="px-3 py-1 rounded-lg bg-[#F6F3EA] hover:bg-[#D4AF37]/20 border border-[#263F32]/10 text-xs font-semibold text-[#162E22] transition-colors"
                                  >
                                    Inspect
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES MANAGEMENT */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#263F32]/12 shadow-xs">
                    <h3 className="text-base font-bold font-serif-editorial text-[#162E22] mb-1">
                      Business Service Architecture Management
                    </h3>
                    <p className="text-xs text-[#252923]/70">
                      Enable or disable public visibility of service categories on the homepage.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoriesList.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-5 rounded-2xl bg-white border border-[#263F32]/12 shadow-xs flex items-start justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[#D4AF37]">0{cat.displayOrder}</span>
                            <h4 className="font-bold text-sm text-[#162E22]">{cat.titleEn}</h4>
                          </div>
                          <div className="text-xs text-[#252923]/60">{cat.titleKn}</div>
                          <div className="text-xs text-[#252923]/75">{cat.descriptionEn}</div>
                          <div className="text-[11px] text-[#D4AF37] font-semibold">
                            {cat.services.length} Active Offerings
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleCategory(cat.id)}
                          className="shrink-0 cursor-pointer"
                        >
                          {cat.isActive ? (
                            <ToggleRight className="w-8 h-8 text-[#25D366]" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="p-6 rounded-3xl bg-white border border-[#263F32]/12 shadow-xs space-y-6 max-w-2xl">
                  <h3 className="text-base font-bold font-serif-editorial text-[#162E22]">
                    Operations Notification & Contact Credentials
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#263F32]/10 space-y-1">
                      <div className="font-bold text-[#162E22]">Official WhatsApp Recipient:</div>
                      <div className="font-mono text-[#9E3D28] font-bold">+91 94480 00000</div>
                      <div className="text-[11px] text-[#252923]/60">Configured via VITE_WHATSAPP_NUMBER in Vercel environment</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#263F32]/10 space-y-1">
                      <div className="font-bold text-[#162E22]">Notification Dispatch Email:</div>
                      <div className="font-mono text-[#162E22] font-bold">inquiries@incharaholidays.com</div>
                      <div className="text-[11px] text-[#252923]/60">Configured via STAFF_NOTIFICATION_EMAIL / RESEND_API_KEY</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F6F3EA] border border-[#263F32]/10 space-y-1">
                      <div className="font-bold text-[#162E22]">Supabase Database URL:</div>
                      <div className="font-mono text-[#252923]/70 truncate">
                        {import.meta.env.VITE_SUPABASE_URL || 'Configured via Vercel Production Environment Variables'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}

        {/* SLIDING DETAIL DRAWER FOR SELECTED INQUIRY */}
        <AnimatePresence>
          {selectedInquiry && (
            <div className="fixed inset-0 z-[1060] flex justify-end bg-black/50 backdrop-blur-xs">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#D4AF37]/35 overflow-hidden"
              >
                {/* Drawer Header */}
                <div className="p-5 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/25 flex items-center justify-between shrink-0">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#F5D77F]">
                        {selectedInquiry.referenceNumber}
                      </span>
                      {getStatusBadge(selectedInquiry.status)}
                    </div>
                    <div className="text-xs text-[#E4D8C5]/75">
                      Submitted on {new Date(selectedInquiry.createdAt).toLocaleString('en-IN')} IST
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EA] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#252923]">
                  {/* Status Control Banner */}
                  <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#263F32]/12 space-y-2">
                    <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider">
                      Advance Inquiry Status
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['new', 'contacted', 'in_progress', 'proposal_sent', 'confirmed', 'closed', 'cancelled'] as InquiryStatus[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStatusChange(st)}
                          disabled={isUpdatingStatus}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer border ${
                            selectedInquiry.status === st
                              ? 'bg-[#162E22] text-[#F5D77F] border-[#D4AF37] shadow-xs'
                              : 'bg-white text-[#252923]/70 border-[#263F32]/10 hover:border-[#D4AF37]'
                          }`}
                        >
                          {st.replace('_', ' ')}
                        </button>
                      ))}
                    </div>

                    {updateSuccessMsg && (
                      <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 pt-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{updateSuccessMsg}</span>
                      </div>
                    )}
                  </div>

                  {/* Customer Information */}
                  <div className="p-4 rounded-2xl bg-white border border-[#263F32]/12 space-y-3">
                    <h4 className="font-bold text-[#162E22] text-xs uppercase tracking-wider">
                      Customer Profile
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#252923]/50">Name:</span>
                        <div className="font-bold text-[#162E22]">{selectedInquiry.customerName}</div>
                      </div>
                      <div>
                        <span className="text-[#252923]/50">Phone:</span>
                        <div className="font-mono font-bold text-[#162E22] flex items-center gap-1">
                          <span>{selectedInquiry.phone}</span>
                          <a
                            href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-md bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/30 ml-1"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#252923]/50">Email:</span>
                        <div>{selectedInquiry.email || 'Not provided'}</div>
                      </div>
                      <div>
                        <span className="text-[#252923]/50">Language & Channel:</span>
                        <div className="capitalize">{selectedInquiry.preferredLanguage === 'kn' ? 'Kannada' : 'English'} · {selectedInquiry.preferredContactMethod}</div>
                      </div>
                    </div>
                  </div>

                  {/* Service Specific Payload */}
                  <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/35 space-y-3">
                    <h4 className="font-bold text-[#9E3D28] text-xs uppercase tracking-wider">
                      Service Requirements Payload ({selectedInquiry.serviceCategory} - {selectedInquiry.serviceType})
                    </h4>
                    <div className="space-y-1.5 font-mono text-[11px] bg-[#FBF8F1] p-3 rounded-xl border border-[#263F32]/8">
                      {Object.entries(selectedInquiry.servicePayload || {}).map(([k, v]) => (
                        <div key={k} className="flex items-start justify-between gap-2 border-b border-[#263F32]/5 pb-1">
                          <span className="text-[#252923]/60">{k}:</span>
                          <span className="font-bold text-[#162E22] text-right">
                            {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {selectedInquiry.additionalRequirements && (
                      <div className="pt-2">
                        <span className="font-bold text-[#162E22]">Customer Notes:</span>
                        <div className="mt-1 p-2.5 rounded-lg bg-[#F6F3EA] text-xs leading-relaxed text-[#252923]/80">
                          {selectedInquiry.additionalRequirements}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Follow-up & Internal Notes */}
                  <div className="p-4 rounded-2xl bg-white border border-[#263F32]/12 space-y-3">
                    <h4 className="font-bold text-[#162E22] text-xs uppercase tracking-wider">
                      Follow-up & Internal Notes
                    </h4>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                        Next Follow-up Date
                      </label>
                      <input
                        type="date"
                        value={editFollowupDate}
                        onChange={(e) => setEditFollowupDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden bg-[#FBF8F1]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                        Internal Staff Notes & Log
                      </label>
                      <textarea
                        rows={3}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Log customer discussions, pricing quotes shared, or itinerary changes..."
                        className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden resize-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveDetails}
                      disabled={isUpdatingStatus}
                      className="px-4 py-2 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Save Internal Notes
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
