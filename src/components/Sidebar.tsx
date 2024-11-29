import React, { useState } from 'react';
import { ExportPDF } from './ExportPDF';
import { Square, Heading, TextIcon, FileDown, Locate, Image } from 'lucide-react';
import { CanvasComponent } from '../types'; 
import { ExportModal } from './modals/modalExport';

type ComponentType = 'button' | 'title' | 'text'| 'carousel'| 'geolocalisation';

interface SidebarProps {
  onAddComponent: (type: ComponentType) => void;
  components: CanvasComponent[];
}

export function Sidebar({ onAddComponent, components }: SidebarProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 h-screen p-4 flex flex-col gap-3">
      <h2 className="text-white text-xl font-bold mb-4">Components</h2>
      <button
        onClick={() => onAddComponent('button')}
        className="flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-lg w-full"
      >
        <Square size={20} />
        <span>Button</span>
      </button>

      <button
        onClick={() => onAddComponent('title')}
        className="flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-lg w-full"
      >
        <Heading size={20} />
        <span>Title</span>
      </button>

      <button
        onClick={() => onAddComponent('text')}
        className="flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-lg w-full"
      >
        <TextIcon size={20} />
        <span>Text</span>
      </button>
    </div>
  );
}