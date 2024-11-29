import React from 'react';
import { Download } from 'lucide-react';
import { CanvasComponent } from '../types';

interface ExportButtonProps {
  components: CanvasComponent[];
}

export const baseStyles = `
body { 
  margin: 0; 
  padding: 20px; 
  font-family: sans-serif; 
}
.component { 
  position: absolute; 
}
.button { 
  padding: 8px 16px; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: background-color 0.2s;
}
.title { 
  margin: 0; 
}
.text { 
  margin: 0; 
}
`;

export function ExportButton({ components }: ExportButtonProps) {
  const generateComponentStyle = (component: CanvasComponent) => {
    const styles = [
      `position: absolute`,
      `left: ${component.position.x}px`,
      `top: ${component.position.y}px`
    ];

    if (component.width) {
      styles.push(`width: ${component.width}px`);
    }

    if (component.backgroundColor) {
      styles.push(`background-color: ${component.backgroundColor}`);
    }

    if (component.textColor) {
      styles.push(`color: ${component.textColor}`);
    }

    if (component.fontSize) {
      styles.push(`font-size: ${component.fontSize}px`);
    }

    return styles.join('; ');
  };

  const generateHTML = () => {
    const componentsHTML = components
      .map((component) => {
        const style = generateComponentStyle(component);
        
        switch (component.type) {
          case 'button':
            return `
              <button 
                class="component button" 
                style="${style}; ${!component.backgroundColor ? 'background-color: #3b82f6; color: white;' : ''}"
              >
                ${component.content || 'Button'}
              </button>`;
          case 'title':
            return `
              <h2 
                class="component title" 
                style="${style}; ${!component.fontSize ? 'font-size: 1.5rem;' : ''}"
              >
                ${component.content || 'Title'}
              </h2>`;
          case 'text':
            return `
              <p 
                class="component text" 
                style="${style}; ${!component.textColor ? 'color: #374151;' : ''}"
              >
                ${component.content || 'Text content'}
              </p>`;
          default:
            return '';
        }
      })
      .join('\n');

    // Add JavaScript for interactivity
    const interactiveJS = `
      <script>
        // Make components draggable
        document.querySelectorAll('.component').forEach(component => {
          let isDragging = false;
          let currentX;
          let currentY;
          let initialX;
          let initialY;
          let xOffset = 0;
          let yOffset = 0;

          component.addEventListener('mousedown', dragStart);
          document.addEventListener('mousemove', drag);
          document.addEventListener('mouseup', dragEnd);

          function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === component) {
              isDragging = true;
            }
          }

          function drag(e) {
            if (isDragging) {
              e.preventDefault();
              currentX = e.clientX - initialX;
              currentY = e.clientY - initialY;

              xOffset = currentX;
              yOffset = currentY;

              setTranslate(currentX, currentY, component);
            }
          }

          function setTranslate(xPos, yPos, el) {
            el.style.transform = \`translate3d(\${xPos}px, \${yPos}px, 0)\`;
          }

          function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
          }
        });

        // Add hover effect for buttons
        document.querySelectorAll('.button').forEach(button => {
          button.addEventListener('mouseenter', () => {
            const currentBg = button.style.backgroundColor;
            if (currentBg) {
              const darkerColor = adjustColor(currentBg, -20);
              button.style.backgroundColor = darkerColor;
            }
          });

          button.addEventListener('mouseleave', () => {
            const currentBg = button.style.backgroundColor;
            if (currentBg) {
              const lighterColor = adjustColor(currentBg, 20);
              button.style.backgroundColor = lighterColor;
            }
          });
        });

        // Helper function to adjust color brightness
        function adjustColor(color, amount) {
          return '#' + color.replace(/^#/, '').replace(/../g, color => 
            ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
          );
        }
      </script>
    `;

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
    ${interactiveJS}
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