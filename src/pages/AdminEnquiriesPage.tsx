import React, { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Enquiry, EnquiryStatus } from '../types/enquiry';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Package, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Search, 
  Filter, 
  Eye, 
  X, 
  ChevronDown,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useRouter } from '../context/RouterContext';

export function AdminEnquiriesPage() {
  const { navigate } = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | EnquiryStatus>('ALL');

  const fetchEnquiries = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries(data.data || []);
      } else {
        setErrorMessage(data.message || 'Failed to load enquiries');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMessage('Could not connect to backend server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setIsUpdatingStatus(id);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setSuccessMessage(`Enquiry status updated to ${newStatus}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update status error:', err);
      setErrorMessage('Network error while updating status');
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record from database?')) {
      return;
    }

    setIsDeleting(id);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
        setSuccessMessage('Enquiry deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(data.message || 'Failed to delete enquiry');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setErrorMessage('Network error while deleting enquiry');
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesStatus;

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      (item.product && item.product.toLowerCase().includes(query)) ||
      (item.application && item.application.toLowerCase().includes(query)) ||
      (item.message && item.message.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse" />
            NEW
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            CONTACTED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            IN PROGRESS
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            CLOSED
          </span>
        );
      default:
        return null;
    }
  };

  const statusCounts = {
    ALL: enquiries.length,
    NEW: enquiries.filter((e) => e.status === 'NEW').length,
    CONTACTED: enquiries.filter((e) => e.status === 'CONTACTED').length,
    IN_PROGRESS: enquiries.filter((e) => e.status === 'IN_PROGRESS').length,
    CLOSED: enquiries.filter((e) => e.status === 'CLOSED').length,
  };

  return (
    <PageWrapper
      title="Commercial Enquiries Console | BhuviQ Nyra"
      description="Corporate and technical enquiry management dashboard for BhuviQ Nyra International."
    >
      <div className="pt-28 pb-20 bg-[#FAF8F2] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="bg-[#102A43] text-white p-8 rounded-sm border border-[#B89B5E]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold tracking-wider uppercase border border-[#B89B5E]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>B2B Commercial Admin Portal</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] font-normal">
                Business Enquiries Console
              </h1>
              <p className="text-sm text-[#FAF7F0]/80 font-light max-w-2xl">
                Real-time management for technical specification submissions, pilot formulation requests, and bulk commercial contracts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/settings')}
                className="text-white border-white/30 hover:bg-white/10 text-xs"
              >
                <Layers className="w-3.5 h-3.5 mr-1.5 text-[#B89B5E]" />
                Logo & Brand Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchEnquiries}
                disabled={isLoading}
                className="text-white border-white/30 hover:bg-white/10 text-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/partner-with-us')}
                className="text-xs tracking-wider"
              >
                Open Enquiry Form
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Feedback alerts */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-sm flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`p-4 bg-white border rounded-sm text-left transition-all ${
                statusFilter === 'ALL'
                  ? 'border-[#102A43] shadow-sm bg-[#102A43]/5'
                  : 'border-[#102A43]/10 hover:border-[#102A43]/30'
              }`}
            >
              <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Total Enquiries</span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#102A43] mt-1">{statusCounts.ALL}</p>
            </button>

            <button
              onClick={() => setStatusFilter('NEW')}
              className={`p-4 bg-white border rounded-sm text-left transition-all ${
                statusFilter === 'NEW'
                  ? 'border-emerald-600 shadow-sm bg-emerald-50/50'
                  : 'border-[#102A43]/10 hover:border-emerald-400'
              }`}
            >
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">New</span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">{statusCounts.NEW}</p>
            </button>

            <button
              onClick={() => setStatusFilter('CONTACTED')}
              className={`p-4 bg-white border rounded-sm text-left transition-all ${
                statusFilter === 'CONTACTED'
                  ? 'border-blue-600 shadow-sm bg-blue-50/50'
                  : 'border-[#102A43]/10 hover:border-blue-400'
              }`}
            >
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Contacted</span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-blue-700 mt-1">{statusCounts.CONTACTED}</p>
            </button>

            <button
              onClick={() => setStatusFilter('IN_PROGRESS')}
              className={`p-4 bg-white border rounded-sm text-left transition-all ${
                statusFilter === 'IN_PROGRESS'
                  ? 'border-amber-600 shadow-sm bg-amber-50/50'
                  : 'border-[#102A43]/10 hover:border-amber-400'
              }`}
            >
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">In Progress</span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-700 mt-1">{statusCounts.IN_PROGRESS}</p>
            </button>

            <button
              onClick={() => setStatusFilter('CLOSED')}
              className={`p-4 bg-white border rounded-sm text-left transition-all ${
                statusFilter === 'CLOSED'
                  ? 'border-slate-600 shadow-sm bg-slate-50/50'
                  : 'border-[#102A43]/10 hover:border-slate-400'
              }`}
            >
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Closed</span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-slate-700 mt-1">{statusCounts.CLOSED}</p>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-sm border border-[#102A43]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, company, email, country..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/15 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-[#667085] hover:text-[#102A43]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs text-[#667085] shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 bg-[#FAF8F2] border border-[#102A43]/15 rounded-sm text-xs font-medium text-[#102A43] focus:outline-none focus:border-[#102A43]"
              >
                <option value="ALL">All Statuses ({statusCounts.ALL})</option>
                <option value="NEW">NEW ({statusCounts.NEW})</option>
                <option value="CONTACTED">CONTACTED ({statusCounts.CONTACTED})</option>
                <option value="IN_PROGRESS">IN PROGRESS ({statusCounts.IN_PROGRESS})</option>
                <option value="CLOSED">CLOSED ({statusCounts.CLOSED})</option>
              </select>
            </div>
          </div>

          {/* Enquiries Data Table */}
          <div className="bg-white rounded-sm border border-[#102A43]/10 shadow-xs overflow-hidden">
            {isLoading ? (
              <div className="p-16 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-[#285943] animate-spin mx-auto" />
                <p className="text-sm text-[#667085]">Retrieving database records...</p>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="p-16 text-center space-y-3">
                <Package className="w-12 h-12 text-[#667085]/40 mx-auto" />
                <h3 className="font-serif text-lg font-semibold text-[#102A43]">No Enquiries Found</h3>
                <p className="text-xs text-[#667085] max-w-sm mx-auto">
                  {searchQuery || statusFilter !== 'ALL'
                    ? 'No matching enquiries for current filter criteria. Try resetting filters.'
                    : 'No business enquiries have been submitted yet.'}
                </p>
                {(searchQuery || statusFilter !== 'ALL') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('ALL');
                    }}
                    className="mt-2 text-xs"
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#102A43]/5 border-b border-[#102A43]/10 text-[11px] uppercase tracking-wider font-semibold text-[#102A43]">
                      <th className="py-3.5 px-4">Contact & Company</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Requirement</th>
                      <th className="py-3.5 px-4">Volume</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A43]/5 text-xs text-[#17202A]">
                    {filteredEnquiries.map((enq) => (
                      <tr
                        key={enq.id}
                        className="hover:bg-[#FAF8F2] transition-colors cursor-pointer"
                        onClick={() => setSelectedEnquiry(enq)}
                      >
                        <td className="py-4 px-4">
                          <div className="font-semibold text-[#102A43] text-sm">{enq.name}</div>
                          <div className="text-[#285943] font-medium flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-[#285943]" />
                            {enq.company}
                          </div>
                          <div className="text-[#667085] text-[11px] mt-0.5">{enq.email}</div>
                          {enq.phone && <div className="text-[#667085] text-[10px]">{enq.phone}</div>}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 font-medium text-[#102A43]">
                            <Globe className="w-3 h-3 text-[#B89B5E]" />
                            {enq.country}
                          </div>
                        </td>

                        <td className="py-4 px-4 max-w-xs">
                          <div className="font-medium text-[#102A43] truncate">
                            {enq.product || 'Standard Banana Powder'}
                          </div>
                          <div className="text-[#667085] text-[11px] truncate">
                            {enq.application || 'Industrial'}
                          </div>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded bg-[#285943]/10 text-[#285943] font-semibold text-[11px]">
                            {enq.quantity || 'Sample'}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(enq.status)}
                            <select
                              value={enq.status}
                              disabled={isUpdatingStatus === enq.id}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                              className="px-2 py-1 bg-white border border-[#102A43]/15 rounded text-[11px] text-[#102A43] focus:outline-none"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="CLOSED">CLOSED</option>
                            </select>
                          </div>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-[#667085] text-[11px]">
                          {new Date(enq.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedEnquiry(enq)}
                              title="View full enquiry details"
                              className="p-1.5 rounded hover:bg-[#102A43]/10 text-[#102A43] transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(enq.id)}
                              disabled={isDeleting === enq.id}
                              title="Delete enquiry"
                              className="p-1.5 rounded hover:bg-red-100 text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF8F2] w-full max-w-2xl rounded-sm border border-[#B89B5E]/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#102A43] text-white p-6 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#B89B5E] bg-white/10 px-2 py-0.5 rounded">
                    ENQ ID: {selectedEnquiry.id}
                  </span>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <h3 className="font-serif text-2xl text-[#FAF7F0] font-normal">
                  {selectedEnquiry.name}
                </h3>
                <p className="text-xs text-[#FAF7F0]/80">
                  {selectedEnquiry.company} • {selectedEnquiry.country}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#17202A]">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-sm border border-[#102A43]/10">
                <div>
                  <span className="text-[#667085] uppercase tracking-wider text-[10px] font-semibold">Business Email</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#102A43] mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-[#285943]" />
                    <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] uppercase tracking-wider text-[10px] font-semibold">Phone / Mobile</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#102A43] mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-[#285943]" />
                    <span>{selectedEnquiry.phone || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] uppercase tracking-wider text-[10px] font-semibold">Product Interest</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#102A43] mt-0.5">
                    <Package className="w-3.5 h-3.5 text-[#B89B5E]" />
                    <span>{selectedEnquiry.product || 'Standard Grade'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] uppercase tracking-wider text-[10px] font-semibold">Target Application</span>
                  <div className="flex items-center gap-1.5 font-medium text-[#102A43] mt-0.5">
                    <Layers className="w-3.5 h-3.5 text-[#B89B5E]" />
                    <span>{selectedEnquiry.application || 'Standard Application'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] uppercase tracking-wider text-[10px] font-semibold">Volume Requirement</span>
                  <div className="font-semibold text-[#285943] mt-0.5">
                    {selectedEnquiry.quantity || 'Not specified'}
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] uppercase tracking-wider text-[10px] font-semibold">Submission Date</span>
                  <div className="flex items-center gap-1.5 text-[#102A43] mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#667085]" />
                    <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Message Block */}
              <div className="space-y-2">
                <span className="text-[#102A43] uppercase tracking-wider text-xs font-semibold">
                  Formulation Specifications & Message
                </span>
                <div className="p-4 bg-white border border-[#102A43]/10 rounded-sm text-sm text-[#17202A] leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Update Control in Modal */}
              <div className="p-4 bg-[#102A43]/5 border border-[#102A43]/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-[#102A43]">Update Processing Status</span>
                  <p className="text-[11px] text-[#667085]">Change status as technical review progresses.</p>
                </div>

                <div className="flex items-center gap-2">
                  {(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED'] as EnquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      disabled={selectedEnquiry.status === st || isUpdatingStatus === selectedEnquiry.id}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        selectedEnquiry.status === st
                          ? 'bg-[#102A43] text-white shadow-xs'
                          : 'bg-white border border-[#102A43]/20 text-[#102A43] hover:bg-[#102A43]/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-[#102A43]/10 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Record
              </button>

              <Button variant="primary" size="sm" onClick={() => setSelectedEnquiry(null)}>
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
