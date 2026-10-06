import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProjectFormModal } from '../../components/admin/ProjectFormModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
} from '../../services/adminProjectsService';
import { useAuth } from '../../context/AuthContext';
import {
  FolderKanban,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const ProjectsAdmin = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getAdminProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateNew = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteTrigger = (project) => {
    setDeletingProject(project);
    setIsDeleteOpen(true);
  };

  const handleSaveProject = async (formData) => {
    setSaving(true);
    try {
      if (editingProject) {
        const updated = await updateAdminProject(editingProject.id, formData, user?.uid);
        setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? { ...p, ...updated } : p)));
        showToast('Project updated successfully in Firestore!');
      } else {
        const created = await createAdminProject(formData, user?.uid);
        setProjects((prev) => [created, ...prev]);
        showToast('New project created successfully!');
      }
      setIsFormOpen(false);
    } catch (err) {
      showToast('Error saving project: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingProject) return;
    setDeleting(true);
    try {
      await deleteAdminProject(deletingProject.id);
      setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id));
      showToast('Project deleted permanently!');
      setIsDeleteOpen(false);
    } catch (err) {
      showToast('Error deleting project: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (p.titleHi + ' ' + p.titleEn).toLowerCase().includes(q);
      const matchLoc = (p.location?.villageHi || '').toLowerCase().includes(q);
      if (!matchTitle && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md animate-fade-in ${
            toastMessage.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-ngo-green-700" />
            <span>Field Projects Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, filter and track field welfare projects across Janjgir-Champa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={handleCreateNew}>
            Add New Project
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
              statusFilter === 'all' ? 'bg-white text-ngo-green-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setStatusFilter('ongoing')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
              statusFilter === 'ongoing' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Ongoing ({projects.filter((p) => p.status === 'ongoing').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
              statusFilter === 'completed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Completed ({projects.filter((p) => p.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Beneficiaries</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProjects.map((proj) => {
                const isOngoing = proj.status === 'ongoing';
                return (
                  <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.titleHi}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1">{proj.titleHi}</h4>
                          <p className="text-[11px] text-slate-500 font-mono line-clamp-1">{proj.titleEn}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <Badge variant="green" size="sm">
                        {proj.categoryLabelHi || proj.category}
                      </Badge>
                    </td>

                    <td className="p-4 text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-ngo-gold-700 shrink-0" />
                        <span>{proj.location?.villageHi || 'नवागढ़'}</span>
                      </span>
                    </td>

                    <td className="p-4 text-slate-800 font-bold">
                      {proj.beneficiariesCount} / {proj.targetBeneficiariesCount}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          isOngoing
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {isOngoing ? 'Ongoing' : 'Completed'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/projects/${proj.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-500 hover:text-ngo-green-700 hover:bg-slate-100 rounded-lg"
                          title="View Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleEdit(proj)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrigger(proj)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
        isLoading={saving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Field Project"
        itemName={deletingProject?.titleHi}
        isLoading={deleting}
      />
    </div>
  );
};
