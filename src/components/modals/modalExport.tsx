import React, { useState } from 'react';
import { X, Download, FileDown } from 'lucide-react';
import { CanvasComponent } from '../../types';
import { ExportButton } from '../ExportHTML';
import { ExportPDF } from '../ExportPDF';
 

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: CanvasComponent[];
}

export function ExportModal({ isOpen, onClose, components }: ExportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Export Options</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          
    
            <ExportPDF canvasId="canvas" />
          <ExportButton components={components} />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full text-gray-400 hover:text-white text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}