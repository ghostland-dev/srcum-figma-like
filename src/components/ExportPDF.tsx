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
        const canvas = await html2canvas(canvasElement);
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'px', 'a4');
        pdf.addImage(imageData, 'PNG', 10, 10, 400, 400);
        pdf.save('canvas-export.pdf');
      }
    };
  
    return <div onClick={handleExportPDF}>Export PDF</div>;
  }
  
