import React from 'react';
import { Trash2, X} from 'lucide-react';
import { CanvasComponent } from '../types';

interface EditPanelProps {
  component: CanvasComponent | null;
  onUpdate: (updates: Partial<CanvasComponent>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function EditPanel({ component, onUpdate, onDelete, onClose }: EditPanelProps) {
  if (!component) return null;

  return (
    <div className="absolute right-0 top-0 w-64 h-screen bg-gray-800 p-4 text-white overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Edit {component.type}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        { component.type != "geolocalisation" && 
          <div>
            <label className="block text-sm mb-2">Content</label>
            <input
              type="text"
              value={component.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded text-white"
            />
          </div>         
        }

      <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-sm mb-2">Position X</label>
        <input
          type="number"
          value={component.position.x}
          onChange={(e) => onUpdate({ 
            position: { ...component.position, x: Number(e.target.value) }
          })}
          className="w-full px-3 py-2 bg-gray-700 rounded text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Position Y</label>
        <input
          type="number"
          value={component.position.y}
          onChange={(e) => onUpdate({ 
            position: { ...component.position, y: Number(e.target.value) }
          })}
          className="w-full px-3 py-2 bg-gray-700 rounded text-white"
        />
      </div>
      </div>

      <div>
      <label className="block text-sm mb-2">Width</label>
      <input
        type="number"
        value={component.width || 'auto'}
        onChange={(e) => onUpdate({ width: Number(e.target.value) })}
        className="w-full px-3 py-2 bg-gray-700 rounded text-white"
      />
      </div>

      <div>
      <label className="block text-sm mb-2">Background Color</label>
      <input
        type="color"
        value={component.backgroundColor || '#ffffff'}
        onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
        className="w-full h-10 bg-gray-700 rounded cursor-pointer"
      />
      </div>

      <div>
      <label className="block text-sm mb-2">Text Color</label>
      <input
        type="color"
        value={component.textColor || '#000000'}
        onChange={(e) => onUpdate({ textColor: e.target.value })}
        className="w-full h-10 bg-gray-700 rounded cursor-pointer"
      />
      </div>

      <div>
      <label className="block text-sm mb-2">Font Size</label>
      <input
        type="number"
        value={component.fontSize || 16}
        onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
        className="w-full px-3 py-2 bg-gray-700 rounded text-white"
      />
      </div>

      <button
      onClick={() => onDelete(component.id)}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-4 bg-red-500 hover:bg-red-600 rounded text-white"
      >
      <Trash2 size={20} />
      Delete Element
      </button>
    </div>
  </div>
  );
}


{/*  */}