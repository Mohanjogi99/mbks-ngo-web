import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, itemName, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>{title || 'Delete Confirmation'}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Are you sure you want to delete <strong className="text-slate-900 font-bold">"{itemName}"</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" icon={Trash2} isLoading={isLoading} onClick={onConfirm}>
            Delete Permanently
          </Button>
        </div>
      </div>
    </div>
  );
};
