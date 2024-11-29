import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportPDFProps {
  canvasId: string;
}

export function ExportPDF({ canvasId }: ExportPDFProps) {
    const handleExportPDF = async () => {
      const canvasElement = document.getElementById(canvasId);
      if (canvasElement) {
        const width = canvasElement.scrollWidth;
        const height = canvasElement.scrollHeight;
    
        const canvas = await html2canvas(canvasElement);
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'px', [width, height]);
        pdf.addImage(imageData, 'PNG', 0, 0, width, height);
        pdf.save('canvas-export.pdf');
      }
    };
  
    return <div onClick={handleExportPDF}>Export PDF</div>;
  }
  
