import React from 'react';
import { Download } from 'lucide-react';
import { CanvasComponent } from '../types';

interface ExportButtonProps {
  components: CanvasComponent[];
}

export const baseStyles = `
body { margin: 0; padding: 20px; font-family: sans-serif; }
.component { position: absolute; }
.button { background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
.button:hover { background: #2563eb; }
.title { font-size: 1.5rem; font-weight: bold; margin: 0; }
.text { color: #374151; margin: 0; }
`;


export function ExportButton({ components }: ExportButtonProps) {
  const generateHTML = () => {
 
    const componentsHTML = components
      .map((component) => {
        const style = `position: absolute; left: ${component.position.x}px; top: ${component.position.y}px;`;
        
        switch (component.type) {
          case 'button':
            return `<button class="component button" style="${style}">${
              component.content || 'Button'
            }</button>`;
          case 'title':
            return `<h2 class="component title" style="${style}">${
              component.content || 'Title'
            }</h2>`;
          case 'text':
            return `<p class="component text" style="${style}">${
              component.content || 'Text content'
            }</p>`;
          default:
            return '';
        }
      })
      .join('\n');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Canvas</title>
    <style>${baseStyles}</style>
</head>
<body>
    <div id="canvas" style="position: relative; width: 100%; height: 100vh;">
        ${componentsHTML}
    </div>
</body>
</html>`;
  };

  const handleExport = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
    >
      <Download size={30} />
      Export HTML
    </button>
  );
}